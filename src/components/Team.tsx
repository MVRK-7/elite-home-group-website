import { useReveal } from '../hooks/useReveal';
import teamPhoto from '../assets/team/team-photo.webp';
import './Team.css';

type TeamMember = {
  name: string;
  role: string;
  bio: string;
};

const TEAM: TeamMember[] = [
  {
    name: 'Laci Schritter',
    role: 'Placeholder Role',
    bio: 'Placeholder bio — swap in real team member details.',
  },
  {
    name: 'Brandi Torres',
    role: 'Placeholder Role',
    bio: 'Placeholder bio — swap in real team member details.',
  },
  {
    name: 'Placeholder Name',
    role: 'Placeholder Role',
    bio: 'Placeholder bio — swap in real team member details.',
  },
  {
    name: 'Placeholder Name',
    role: 'Placeholder Role',
    bio: 'Placeholder bio — swap in real team member details.',
  },
  {
    name: 'Placeholder Name',
    role: 'Placeholder Role',
    bio: 'Placeholder bio — swap in real team member details.',
  },
];

function MemberCard({ member, delay }: { member: TeamMember; delay: number }) {
  const { ref, style } = useReveal<HTMLDivElement>(delay);
  return (
    <div ref={ref} style={style} className="team-card">
      <div className="team-card-name">{member.name}</div>
      <div className="team-card-role">{member.role}</div>
      <p className="team-card-bio">{member.bio}</p>
    </div>
  );
}

export default function Team() {
  const intro = useReveal<HTMLDivElement>(0);

  return (
    <section id="team" className="team">
      <div className="team-inner">
        <div ref={intro.ref} className={`team-hero ${intro.visible ? 'is-visible' : ''}`}>
          <div className="team-photo">
            <img src={teamPhoto} alt="The Elite Home Group team" />
          </div>
          <div className="team-kicker">Our team</div>
          <h2 className="team-title">The people behind every closing.</h2>
          <p className="team-copy">
            Elite Home Group is a small, dedicated team of Realty ONE Group agents
            serving Kingman and the surrounding communities &mdash; here for every
            step, from first showing to final signature.
          </p>
        </div>
        <div className="team-grid">
          {TEAM.map((member, i) => (
            <MemberCard key={`${member.name}-${i}`} member={member} delay={Math.min(i * 0.08, 0.24)} />
          ))}
        </div>
      </div>
    </section>
  );
}
