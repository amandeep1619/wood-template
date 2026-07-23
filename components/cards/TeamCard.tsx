"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { TeamMember } from "@/types";

function LinkedinIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function InstagramIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

interface TeamCardProps {
  member: TeamMember;
}

export default function TeamCard({ member }: TeamCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className="group h-full flex flex-col bg-white rounded-xl overflow-hidden border border-wood-200/50 hover:shadow-xl hover:shadow-walnut/10 transition-shadow duration-300"
    >
      <div className="relative h-72 overflow-hidden">
        <Image
          src={member.avatar}
          alt={member.name}
          fill
          className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-dark-wood/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
          {member.social?.linkedin && (
            <a
              href={member.social.linkedin}
              className="w-9 h-9 bg-white/90 rounded-full flex items-center justify-center text-dark-wood hover:bg-gold hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedinIcon size={15} />
            </a>
          )}
          {member.social?.instagram && (
            <a
              href={member.social.instagram}
              className="w-9 h-9 bg-white/90 rounded-full flex items-center justify-center text-dark-wood hover:bg-gold hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <InstagramIcon size={15} />
            </a>
          )}
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex-1">
          <h3 className="font-serif text-xl font-semibold text-dark-wood mb-0.5">{member.name}</h3>
          <p className="text-sm text-gold-dark font-medium mb-3">{member.role}</p>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-4">{member.bio}</p>
          <div className="flex flex-wrap gap-2">
            {member.specialties.slice(0, 3).map((s) => (
              <span key={s} className="text-xs px-3 py-1 bg-beige text-walnut rounded-full font-medium">
                {s}
              </span>
            ))}
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-4 pt-4 border-t border-wood-100 font-medium">
          {member.experience} years experience
        </p>
      </div>
    </motion.div>
  );
}
