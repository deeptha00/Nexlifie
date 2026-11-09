/**
 * Single source of truth for Nexlifie's job openings. No admin panel, no
 * database — add, edit, or close a role by editing this file.
 *
 * Fields:
 *   id             — unique slug, also the /careers/:id route and the
 *                    "Job ID" recorded against every application.
 *   maxApplicants  — enforced two places: this closes the job on the
 *                    website once reached, AND the Google Apps Script
 *                    backend (google-apps-script/Code.gs) has its own
 *                    JOB_LIMITS map that must be kept in sync, since the
 *                    frontend alone can't be trusted to cap applications.
 *   status         — 'open' | 'closed'. Set to 'closed' to manually pull a
 *                    role regardless of how many applications it has.
 */

export const jobOpenings = [
  {
    id: 'smm',
    title: 'Social Media Manager',
    department: 'Nexlifie Media',
    shortDescription: 'Own the social presence for Nexlifie and our client brands — strategy, content, and growth.',
    description:
      'We\'re looking for a Social Media Manager to run social for Nexlifie and the brands we work with through Nexlifie Media. You\'ll plan content, write captions that don\'t sound like every other brand, and turn engagement into real growth — not just likes.',
    experience: '0–1 Year (Freshers Welcome!)',
    workMode: 'On-site',
    employmentType: 'Full-time',
    location: 'Bangalore',
    openings: 1,
    maxApplicants: 50,
    status: 'open',
    responsibilities: [
      'Plan and run monthly content calendars across Instagram, LinkedIn, and other key platforms.',
      'Write captions and short-form copy that fits each brand\'s voice.',
      'Schedule and publish posts, reels, and stories using scheduling tools.',
      'Engage with comments, DMs, and the wider community in real time.',
      'Track performance and turn analytics into clear, actionable reporting.',
      'Work closely with the design and video team to brief and source content.',
    ],
    requirements: [
      '0–1 years of experience managing social accounts — personal, freelance, or internship work counts.',
      'Strong grasp of Instagram and LinkedIn as they work today, not three years ago.',
      'Comfortable writing — captions, hooks, short copy that actually gets read.',
      'Basic familiarity with scheduling and analytics tools.',
      'Freshers with a strong personal brand or portfolio are very welcome.',
    ],
    skills: ['Social Media Strategy', 'Content Planning', 'Copywriting', 'Instagram', 'LinkedIn', 'Canva', 'Analytics'],
    postedDate: '2026-11-09',
  },
  {
    id: 'hr-trainee',
    title: 'HR Trainee',
    department: 'People & Operations',
    shortDescription: 'Support hiring, onboarding, and day-to-day people operations as we grow the team.',
    description:
      'We\'re hiring an HR Trainee to help run the people side of a small, fast-growing team. You\'ll be close to hiring decisions, onboarding, and the systems that keep a team running smoothly — real responsibility, not just coffee runs and spreadsheets nobody reads.',
    experience: '0–1 Year (Freshers Welcome!)',
    workMode: 'On-site',
    employmentType: 'Full-time',
    location: 'Bangalore',
    openings: 1,
    maxApplicants: 50,
    status: 'open',
    responsibilities: [
      'Source and screen candidates for open roles across the team.',
      'Coordinate interviews and keep candidates informed at every stage.',
      'Help plan and run onboarding for new hires.',
      'Maintain accurate HR records and documentation.',
      'Support culture and engagement initiatives across the team.',
      'Assist with day-to-day HR admin and process improvements.',
    ],
    requirements: [
      'Pursuing or recently completed a degree — any stream.',
      'Clear, professional written and verbal communication.',
      'Organized and comfortable juggling multiple candidates/processes at once.',
      'Comfortable with Google Workspace and spreadsheets.',
      'No prior HR experience required — we\'ll teach you the rest.',
    ],
    skills: ['Recruitment', 'Communication', 'Onboarding', 'Google Sheets', 'Organization', 'People Operations'],
    postedDate: '2026-11-09',
  },
  {
    id: 'business-development-executive',
    title: 'Business Development Executive',
    department: 'Sales & Growth',
    shortDescription: 'Drive new business for Nexlifie through outreach, pitching, and closing deals.',
    description:
      'We\'re looking for a Business Development Executive to bring in new clients for Nexlifie. You\'ll own outreach, pitch our services, and move deals from first contact to signed client — directly shaping the business, not just logging activity in a CRM.',
    experience: '0–1 Year (Freshers Welcome!)',
    workMode: 'On-site',
    employmentType: 'Full-time',
    location: 'Bangalore',
    openings: 1,
    maxApplicants: 50,
    status: 'open',
    responsibilities: [
      'Generate and qualify leads through outbound calls, emails, and LinkedIn.',
      'Pitch Nexlifie\'s development and marketing services to prospective clients.',
      'Build and manage a sales pipeline from first contact through to close.',
      'Coordinate with the founders on proposals and pricing.',
      'Keep CRM records accurate and up to date.',
      'Hit monthly outreach and revenue targets.',
    ],
    requirements: [
      '0–1 years of experience — sales, internships, or relevant coursework all count.',
      'Strong verbal and written communication skills.',
      'Comfortable with outbound, cold outreach — calls, emails, LinkedIn.',
      'Self-motivated and target-driven.',
      'Interest in tech/digital services is a plus, not a requirement.',
    ],
    skills: ['Lead Generation', 'Cold Outreach', 'B2B Sales', 'CRM', 'Negotiation', 'Communication'],
    postedDate: '2026-11-09',
  },
  {
    id: '3d-artist-designer',
    title: '3D Artist',
    department: 'Design',
    shortDescription: 'Model, rig, animate, and render 3D assets for client projects, games, and brand work.',
    description:
      'We\'re looking for a 3D Artist to create visuals and assets that make client products, games, and brand work stand out. You\'ll model, rig, animate, light, and render — and bring assets into Unity for interactive work — real production work that ships, not just practice scenes.',
    experience: '0–1 Year (Freshers Welcome!)',
    workMode: 'On-site',
    employmentType: 'Full-time',
    location: 'Bangalore',
    openings: 1,
    maxApplicants: 50,
    status: 'open',
    responsibilities: [
      'Model, texture, and rig 3D assets for client projects, games, and brand work.',
      'Animate characters and objects for renders, product visuals, and in-game use.',
      'Light and render scenes to a client-ready, polished finish.',
      'Bring 3D assets into Unity for interactive and game-related projects.',
      'Follow a clean production pipeline and collaborate closely with the design and dev team.',
      'Manage multiple projects and deadlines at once.',
    ],
    requirements: [
      'A portfolio showing real 3D work — student or personal projects are welcome.',
      'Proficiency in Maya or Blender, including modeling and rigging.',
      'Understanding of animation fundamentals, lighting, and rendering.',
      'Some exposure to Unity and getting assets working in a real-time engine.',
      'Comfortable working within a pipeline and collaborating with other artists/developers.',
      'Freshers with a strong portfolio are encouraged to apply.',
    ],
    skills: ['Modeling', 'Rigging', 'Animation', 'Rendering & Lighting', 'Maya', 'Blender', 'Unity', 'Pipeline & Collaboration'],
    postedDate: '2026-11-09',
  },
];

export const getOpenJobs = () => jobOpenings.filter((job) => job.status === 'open');

export const getJobById = (id) => jobOpenings.find((job) => job.id === id);

export const jobSlugs = jobOpenings.map((job) => job.id);
