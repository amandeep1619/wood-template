import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1754200000000 implements MigrationInterface {
  name = "InitialSchema1754200000000";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS pgcrypto;`);

    // ── admin_roles / admin_users ──────────────────────────────────────
    await queryRunner.query(`
      CREATE TABLE "admin_roles" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        "created_at" timestamptz NOT NULL DEFAULT now(),
        "updated_at" timestamptz NOT NULL DEFAULT now(),
        "key" varchar(32) NOT NULL UNIQUE,
        "name" varchar(80) NOT NULL
      );
    `);

    await queryRunner.query(`
      CREATE TABLE "admin_users" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        "created_at" timestamptz NOT NULL DEFAULT now(),
        "updated_at" timestamptz NOT NULL DEFAULT now(),
        "email" varchar(255) NOT NULL UNIQUE,
        "password_hash" varchar(255) NOT NULL,
        "name" varchar(160) NOT NULL,
        "role_id" uuid NOT NULL REFERENCES "admin_roles"("id"),
        "is_active" boolean NOT NULL DEFAULT true,
        "last_login_at" timestamptz
      );
    `);

    // ── categories (project / blog / service) ──────────────────────────
    for (const table of ["project_categories", "blog_categories", "service_categories"]) {
      await queryRunner.query(`
        CREATE TABLE "${table}" (
          "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
          "created_at" timestamptz NOT NULL DEFAULT now(),
          "updated_at" timestamptz NOT NULL DEFAULT now(),
          "deleted_at" timestamptz,
          "slug" varchar(160) NOT NULL,
          "name" varchar(160) NOT NULL,
          "description" text,
          "is_active" boolean NOT NULL DEFAULT true,
          "sort_order" integer NOT NULL DEFAULT 0
        );
      `);
      await queryRunner.query(`
        CREATE UNIQUE INDEX "uq_${table}_slug" ON "${table}" ("slug") WHERE "deleted_at" IS NULL;
      `);
    }

    // ── team_members ────────────────────────────────────────────────────
    await queryRunner.query(`
      CREATE TABLE "team_members" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        "created_at" timestamptz NOT NULL DEFAULT now(),
        "updated_at" timestamptz NOT NULL DEFAULT now(),
        "deleted_at" timestamptz,
        "slug" varchar(160) NOT NULL,
        "name" varchar(160) NOT NULL,
        "role" varchar(160) NOT NULL,
        "bio" text NOT NULL,
        "avatar" varchar(500) NOT NULL,
        "years_experience" smallint NOT NULL DEFAULT 0,
        "specialties" text[] NOT NULL DEFAULT '{}',
        "linkedin_url" varchar(500),
        "instagram_url" varchar(500),
        "sort_order" integer NOT NULL DEFAULT 0,
        "is_published" boolean NOT NULL DEFAULT true
      );
    `);
    await queryRunner.query(`
      CREATE UNIQUE INDEX "uq_team_members_slug" ON "team_members" ("slug") WHERE "deleted_at" IS NULL;
    `);

    // ── services ────────────────────────────────────────────────────────
    await queryRunner.query(`
      CREATE TABLE "services" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        "created_at" timestamptz NOT NULL DEFAULT now(),
        "updated_at" timestamptz NOT NULL DEFAULT now(),
        "deleted_at" timestamptz,
        "slug" varchar(200) NOT NULL,
        "category_id" uuid NOT NULL REFERENCES "service_categories"("id"),
        "title" varchar(200) NOT NULL,
        "short_description" varchar(500) NOT NULL,
        "description" text NOT NULL,
        "icon" varchar(32) NOT NULL,
        "image" varchar(500) NOT NULL,
        "starting_price" varchar(64),
        "features" text[] NOT NULL DEFAULT '{}',
        "featured" boolean NOT NULL DEFAULT false,
        "status" varchar(16) NOT NULL DEFAULT 'active',
        "sort_order" integer NOT NULL DEFAULT 0,
        CONSTRAINT "chk_services_status" CHECK ("status" IN ('active', 'inactive'))
      );
    `);
    await queryRunner.query(`
      CREATE UNIQUE INDEX "uq_services_slug" ON "services" ("slug") WHERE "deleted_at" IS NULL;
    `);
    await queryRunner.query(`CREATE INDEX "idx_services_category_id" ON "services" ("category_id");`);

    await queryRunner.query(`
      CREATE TABLE "service_images" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        "created_at" timestamptz NOT NULL DEFAULT now(),
        "updated_at" timestamptz NOT NULL DEFAULT now(),
        "service_id" uuid NOT NULL REFERENCES "services"("id") ON DELETE CASCADE,
        "url" varchar(500) NOT NULL,
        "alt_text" varchar(255),
        "sort_order" integer NOT NULL DEFAULT 0
      );
    `);
    await queryRunner.query(`CREATE INDEX "idx_service_images_service_id" ON "service_images" ("service_id");`);

    await queryRunner.query(`
      CREATE TABLE "service_benefits" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        "created_at" timestamptz NOT NULL DEFAULT now(),
        "updated_at" timestamptz NOT NULL DEFAULT now(),
        "service_id" uuid NOT NULL REFERENCES "services"("id") ON DELETE CASCADE,
        "title" varchar(200) NOT NULL,
        "description" text NOT NULL,
        "sort_order" integer NOT NULL DEFAULT 0
      );
    `);
    await queryRunner.query(`CREATE INDEX "idx_service_benefits_service_id" ON "service_benefits" ("service_id");`);

    await queryRunner.query(`
      CREATE TABLE "service_process_steps" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        "created_at" timestamptz NOT NULL DEFAULT now(),
        "updated_at" timestamptz NOT NULL DEFAULT now(),
        "service_id" uuid NOT NULL REFERENCES "services"("id") ON DELETE CASCADE,
        "step_number" integer NOT NULL,
        "title" varchar(200) NOT NULL,
        "description" text NOT NULL,
        "icon" varchar(32) NOT NULL,
        "duration" varchar(64),
        "sort_order" integer NOT NULL DEFAULT 0
      );
    `);
    await queryRunner.query(`CREATE INDEX "idx_service_process_steps_service_id" ON "service_process_steps" ("service_id");`);

    // ── projects ────────────────────────────────────────────────────────
    await queryRunner.query(`
      CREATE TABLE "projects" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        "created_at" timestamptz NOT NULL DEFAULT now(),
        "updated_at" timestamptz NOT NULL DEFAULT now(),
        "deleted_at" timestamptz,
        "slug" varchar(200) NOT NULL,
        "category_id" uuid NOT NULL REFERENCES "project_categories"("id"),
        "service_id" uuid REFERENCES "services"("id"),
        "title" varchar(200) NOT NULL,
        "short_description" varchar(500) NOT NULL,
        "description" text NOT NULL,
        "challenge" text NOT NULL,
        "solution" text NOT NULL,
        "client" varchar(200) NOT NULL,
        "location" varchar(200) NOT NULL,
        "duration" varchar(64) NOT NULL,
        "year" smallint NOT NULL,
        "cover_image" varchar(500) NOT NULL,
        "materials" text[] NOT NULL DEFAULT '{}',
        "featured" boolean NOT NULL DEFAULT false,
        "status" varchar(16) NOT NULL DEFAULT 'draft',
        "sort_order" integer NOT NULL DEFAULT 0,
        "published_at" timestamptz,
        CONSTRAINT "chk_projects_status" CHECK ("status" IN ('draft', 'published', 'archived'))
      );
    `);
    await queryRunner.query(`
      CREATE UNIQUE INDEX "uq_projects_slug" ON "projects" ("slug") WHERE "deleted_at" IS NULL;
    `);
    await queryRunner.query(`CREATE INDEX "idx_projects_category_id" ON "projects" ("category_id");`);
    await queryRunner.query(`CREATE INDEX "idx_projects_service_id" ON "projects" ("service_id");`);

    await queryRunner.query(`
      CREATE TABLE "project_images" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        "created_at" timestamptz NOT NULL DEFAULT now(),
        "updated_at" timestamptz NOT NULL DEFAULT now(),
        "project_id" uuid NOT NULL REFERENCES "projects"("id") ON DELETE CASCADE,
        "url" varchar(500) NOT NULL,
        "alt_text" varchar(255),
        "sort_order" integer NOT NULL DEFAULT 0
      );
    `);
    await queryRunner.query(`CREATE INDEX "idx_project_images_project_id" ON "project_images" ("project_id");`);

    // ── blog_posts / tags ───────────────────────────────────────────────
    await queryRunner.query(`
      CREATE TABLE "blog_posts" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        "created_at" timestamptz NOT NULL DEFAULT now(),
        "updated_at" timestamptz NOT NULL DEFAULT now(),
        "deleted_at" timestamptz,
        "slug" varchar(200) NOT NULL,
        "category_id" uuid NOT NULL REFERENCES "blog_categories"("id"),
        "author_id" uuid NOT NULL REFERENCES "team_members"("id"),
        "title" varchar(200) NOT NULL,
        "excerpt" varchar(500) NOT NULL,
        "content" text NOT NULL,
        "cover_image" varchar(500) NOT NULL,
        "read_time" smallint NOT NULL DEFAULT 5,
        "featured" boolean NOT NULL DEFAULT false,
        "status" varchar(16) NOT NULL DEFAULT 'draft',
        "published_at" timestamptz,
        CONSTRAINT "chk_blog_posts_status" CHECK ("status" IN ('draft', 'published', 'archived'))
      );
    `);
    await queryRunner.query(`
      CREATE UNIQUE INDEX "uq_blog_posts_slug" ON "blog_posts" ("slug") WHERE "deleted_at" IS NULL;
    `);
    await queryRunner.query(`CREATE INDEX "idx_blog_posts_category_id" ON "blog_posts" ("category_id");`);
    await queryRunner.query(`CREATE INDEX "idx_blog_posts_author_id" ON "blog_posts" ("author_id");`);

    await queryRunner.query(`
      CREATE TABLE "tags" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        "created_at" timestamptz NOT NULL DEFAULT now(),
        "updated_at" timestamptz NOT NULL DEFAULT now(),
        "slug" varchar(80) NOT NULL UNIQUE,
        "name" varchar(80) NOT NULL UNIQUE
      );
    `);

    await queryRunner.query(`
      CREATE TABLE "blog_post_tags" (
        "blog_post_id" uuid NOT NULL REFERENCES "blog_posts"("id") ON DELETE CASCADE,
        "tag_id" uuid NOT NULL REFERENCES "tags"("id") ON DELETE CASCADE,
        PRIMARY KEY ("blog_post_id", "tag_id")
      );
    `);
    await queryRunner.query(`CREATE INDEX "idx_blog_post_tags_tag_id" ON "blog_post_tags" ("tag_id");`);

    // ── testimonials ────────────────────────────────────────────────────
    await queryRunner.query(`
      CREATE TABLE "testimonials" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        "created_at" timestamptz NOT NULL DEFAULT now(),
        "updated_at" timestamptz NOT NULL DEFAULT now(),
        "deleted_at" timestamptz,
        "name" varchar(160) NOT NULL,
        "role" varchar(160) NOT NULL,
        "company" varchar(160),
        "avatar" varchar(500) NOT NULL,
        "rating" smallint NOT NULL,
        "text" text NOT NULL,
        "project_id" uuid REFERENCES "projects"("id"),
        "featured" boolean NOT NULL DEFAULT false,
        "is_published" boolean NOT NULL DEFAULT true,
        "sort_order" integer NOT NULL DEFAULT 0,
        CONSTRAINT "chk_testimonials_rating" CHECK ("rating" BETWEEN 1 AND 5)
      );
    `);
    await queryRunner.query(`CREATE INDEX "idx_testimonials_project_id" ON "testimonials" ("project_id");`);

    // ── faqs ────────────────────────────────────────────────────────────
    await queryRunner.query(`
      CREATE TABLE "faqs" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        "created_at" timestamptz NOT NULL DEFAULT now(),
        "updated_at" timestamptz NOT NULL DEFAULT now(),
        "service_id" uuid REFERENCES "services"("id") ON DELETE CASCADE,
        "topic" varchar(80),
        "question" varchar(300) NOT NULL,
        "answer" text NOT NULL,
        "is_published" boolean NOT NULL DEFAULT true,
        "sort_order" integer NOT NULL DEFAULT 0
      );
    `);
    await queryRunner.query(`CREATE INDEX "idx_faqs_service_id" ON "faqs" ("service_id");`);

    // ── contact_submissions / newsletter_subscribers / settings ────────
    await queryRunner.query(`
      CREATE TABLE "contact_submissions" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        "created_at" timestamptz NOT NULL DEFAULT now(),
        "updated_at" timestamptz NOT NULL DEFAULT now(),
        "name" varchar(160) NOT NULL,
        "email" varchar(255) NOT NULL,
        "phone" varchar(32),
        "service_interest" varchar(160),
        "budget_range" varchar(64),
        "message" text NOT NULL,
        "status" varchar(16) NOT NULL DEFAULT 'new',
        "handled_by" uuid REFERENCES "admin_users"("id"),
        CONSTRAINT "chk_contact_submissions_status" CHECK ("status" IN ('new', 'contacted', 'quoted', 'won', 'lost'))
      );
    `);
    await queryRunner.query(`CREATE INDEX "idx_contact_submissions_status" ON "contact_submissions" ("status");`);

    await queryRunner.query(`
      CREATE TABLE "newsletter_subscribers" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        "created_at" timestamptz NOT NULL DEFAULT now(),
        "updated_at" timestamptz NOT NULL DEFAULT now(),
        "email" varchar(255) NOT NULL UNIQUE,
        "status" varchar(16) NOT NULL DEFAULT 'subscribed',
        "subscribed_at" timestamptz NOT NULL DEFAULT now(),
        "unsubscribed_at" timestamptz,
        CONSTRAINT "chk_newsletter_subscribers_status" CHECK ("status" IN ('subscribed', 'unsubscribed'))
      );
    `);

    await queryRunner.query(`
      CREATE TABLE "settings" (
        "key" varchar(100) PRIMARY KEY,
        "value" jsonb NOT NULL,
        "updated_at" timestamptz NOT NULL DEFAULT now()
      );
    `);

    // Seed the two roles referenced by the admin_users FK.
    await queryRunner.query(`
      INSERT INTO "admin_roles" ("key", "name") VALUES ('admin', 'Administrator'), ('editor', 'Editor');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "settings";`);
    await queryRunner.query(`DROP TABLE IF EXISTS "newsletter_subscribers";`);
    await queryRunner.query(`DROP TABLE IF EXISTS "contact_submissions";`);
    await queryRunner.query(`DROP TABLE IF EXISTS "faqs";`);
    await queryRunner.query(`DROP TABLE IF EXISTS "testimonials";`);
    await queryRunner.query(`DROP TABLE IF EXISTS "blog_post_tags";`);
    await queryRunner.query(`DROP TABLE IF EXISTS "tags";`);
    await queryRunner.query(`DROP TABLE IF EXISTS "blog_posts";`);
    await queryRunner.query(`DROP TABLE IF EXISTS "project_images";`);
    await queryRunner.query(`DROP TABLE IF EXISTS "projects";`);
    await queryRunner.query(`DROP TABLE IF EXISTS "service_process_steps";`);
    await queryRunner.query(`DROP TABLE IF EXISTS "service_benefits";`);
    await queryRunner.query(`DROP TABLE IF EXISTS "service_images";`);
    await queryRunner.query(`DROP TABLE IF EXISTS "services";`);
    await queryRunner.query(`DROP TABLE IF EXISTS "team_members";`);
    await queryRunner.query(`DROP TABLE IF EXISTS "service_categories";`);
    await queryRunner.query(`DROP TABLE IF EXISTS "blog_categories";`);
    await queryRunner.query(`DROP TABLE IF EXISTS "project_categories";`);
    await queryRunner.query(`DROP TABLE IF EXISTS "admin_users";`);
    await queryRunner.query(`DROP TABLE IF EXISTS "admin_roles";`);
  }
}
