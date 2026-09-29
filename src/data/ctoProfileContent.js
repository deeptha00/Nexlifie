// Single source of truth for the CTO profile page's copy, ported from the
// standalone portfolio (deeptha00.github.io/Portfolio). Keeping content
// data-driven means the section components stay purely presentational.
import photo from '../assets/ctoProfile/photo.jpg';

export const profile = {
  name: 'Deeptha A',
  title: 'CTO & Co-Founder',
  company: 'Nexlifie',
  website: '/',
  websiteLabel: 'nexlifie.com',
  location: 'Bengaluru, India',
  email: 'deepthaa23@gmail.com',
  linkedin: 'https://www.linkedin.com/in/deeptha-a-b9891323a',
  github: 'https://github.com/deeptha00',
  photo,
};

export const disciplines = [
  { title: 'Custom Software', text: 'Bespoke software designed and built around a specific business need.' },
  { title: 'Software & Web Applications', text: 'Products engineered to be fast, maintainable and built to last.' },
  { title: 'Mobile Applications', text: 'Native and cross-platform apps for iOS and Android.' },
  { title: 'AI-Powered Solutions', text: 'Putting language models and automation to work on real problems.' },
  { title: 'Gaming Applications', text: 'Games and interactive experiences built with Unity and C#.' },
  { title: 'Cloud & Digital Solutions', text: 'Infrastructure and delivery that scale with the product.' },
];

export const journey = [
  { title: 'Idea', text: 'Shaping a concept into a product worth building.' },
  { title: 'Architecture', text: 'Choosing systems and a stack that scale with it.' },
  { title: 'Development', text: 'Hands-on engineering across web, mobile, AI and games.' },
  { title: 'Deployment', text: 'Shipping to the cloud reliably and securely.' },
  { title: 'Improvement', text: 'Continuous iteration once real users arrive.' },
];

export const layers = [
  { id: 'clients', label: 'CLIENTS', text: 'Interfaces people use' },
  { id: 'services', label: 'SERVICES', text: 'Business logic and APIs' },
  { id: 'intelligence', label: 'INTELLIGENCE', text: 'AI and model layer' },
  { id: 'platform', label: 'PLATFORM', text: 'Cloud and delivery' },
];

export const nodes = [
  { id: 'web', layer: 0, x: 0, w: 196, title: 'Web', items: ['React', 'TypeScript', 'JavaScript', 'HTML'], text: 'Web applications and interfaces, built with a modern component-based frontend stack.' },
  { id: 'mobile', layer: 0, x: 222, w: 196, title: 'Mobile', items: ['SwiftUI', 'Flutter', 'Kotlin', 'React Native'], text: 'Native and cross-platform mobile apps for iOS and Android.' },
  { id: 'gaming', layer: 0, x: 444, w: 196, title: 'Gaming', items: ['Unity', 'C#'], text: 'Gaming applications built with Unity and C#, engineered with the same discipline as the rest of the stack.' },
  { id: 'backend', layer: 1, x: 170, w: 300, title: 'Backend services', items: ['Node.js', 'Python'], text: 'APIs and services that connect every client to data, models and infrastructure.' },
  { id: 'llm', layer: 2, x: 70, w: 240, title: 'Models', items: ['AWS Bedrock', 'LLMs', 'AI models'], text: 'Language models and AI services integrated into products through managed cloud endpoints.' },
  { id: 'mcp', layer: 2, x: 330, w: 240, title: 'Tooling', items: ['MCP', 'Model Context Protocol'], text: 'Connecting models to tools and data through the Model Context Protocol.' },
  { id: 'aws', layer: 3, x: 70, w: 240, title: 'AWS', items: ['Cloud infrastructure'], text: 'Cloud infrastructure that hosts, scales and secures the platform.' },
  { id: 'docker', layer: 3, x: 330, w: 240, title: 'Docker', items: ['Containers'], text: 'Containerised builds so what runs in development is what ships to production.' },
];

export const edges = [
  ['web', 'backend'], ['mobile', 'backend'], ['gaming', 'backend'],
  ['backend', 'llm'], ['backend', 'mcp'],
  ['llm', 'aws'], ['mcp', 'docker'], ['aws', 'docker'],
];

export const security = { title: 'Security', items: ['Certified Ethical Hacker (CEH)'], text: 'Security is applied across every layer, backed by a Certified Ethical Hacker (CEH) certification.' };

export const domains = [
  { title: 'E-commerce', text: 'Online commerce products, from storefront to the systems behind it.' },
  { title: 'EdTech', text: 'Education technology products for learners and institutions.' },
  { title: 'Healthcare', text: 'Secure healthcare platforms, including AI-assisted workflows.' },
  { title: 'Enterprise AI', text: 'AI assistants and automation for business operations and support.' },
  { title: 'Industrial IoT', text: 'Monitoring and dashboards for connected devices and equipment.' },
  { title: 'Mobility', text: 'Mobile products for travel and real-time tracking.' },
];
