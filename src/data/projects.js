/**
 * Real Nexlifie client projects — single source of truth for the work shown on
 * the home page (`sections/Works`), the Clients page and the Development page.
 *
 * `build` describes what was delivered and is used on the Development page.
 * Keep this factual: no invented metrics, no invented client outcomes.
 */
import aurelian1 from '../assets/Works/Aurelian/aurelian1.jpg';
import aurelian2 from '../assets/Works/Aurelian/aurelian2.jpg';
import bibo1 from '../assets/Works/BIBO/bibo1.jpg';
import bibo2 from '../assets/Works/BIBO/bibo2.jpg';
import bibo3 from '../assets/Works/BIBO/bibo3.jpg';
import bumblebee1 from '../assets/Works/Bumblebee/bumblebee1.jpg';
import bumblebee2 from '../assets/Works/Bumblebee/bumblebee2.jpg';
import keralasoul1 from '../assets/Works/KeralaSoul/keralasoul1.jpg';
import keralasoul2 from '../assets/Works/KeralaSoul/keralasoul2.jpg';
import keralasoul3 from '../assets/Works/KeralaSoul/keralasoul3.jpg';
import ekody1 from '../assets/Works/Ekody/ekody1.jpg';
import orzen1 from '../assets/Works/Orzen/orzen1.jpg';
import orzen2 from '../assets/Works/Orzen/orzen2.jpg';
import zhaevaah1 from '../assets/Works/Zhaevaah/zhaevaah1.jpg';
import zhaevaah2 from '../assets/Works/Zhaevaah/zhaevaah2.jpg';
import zhaevaah3 from '../assets/Works/Zhaevaah/zhaevaah3.jpg';

export const featuredProject = {
  name: 'Zhaevaah',
  category: 'Jewelry E-Commerce',
  build: 'Online store with product catalogue, collections and checkout.',
  stack: ['Web', 'E-Commerce', 'CMS'],
  images: [zhaevaah1, zhaevaah2, zhaevaah3],
};

export const projects = [
  {
    name: 'Aurelian',
    category: 'Aesthetic Medicine',
    build: 'Clinic website with treatment pages and enquiry flow.',
    stack: ['Web', 'UI/UX'],
    images: [aurelian1, aurelian2],
  },
  {
    name: 'Bibo',
    category: 'E-Commerce',
    build: 'Storefront with product listings, cart and checkout.',
    stack: ['Web', 'E-Commerce'],
    images: [bibo1, bibo2, bibo3],
  },
  {
    name: 'Bumblebee',
    category: 'EdTech Platform',
    build: 'Learning platform front end with course and programme pages.',
    stack: ['Web App', 'UI/UX'],
    images: [bumblebee1, bumblebee2],
  },
  {
    name: 'Orzen',
    category: 'Jewelry Retail',
    build: 'Retail brand site with catalogue and collection browsing.',
    stack: ['Web', 'E-Commerce'],
    images: [orzen1, orzen2],
  },
  {
    name: 'Kerala Soul',
    category: 'Travel & Tourism',
    build: 'Travel website with packages, itineraries and enquiry flow.',
    stack: ['Web', 'CMS'],
    images: [keralasoul1, keralasoul2, keralasoul3],
  },
  {
    name: 'E-Kody',
    category: 'Training & Consultancy',
    build: 'Corporate site with service pages and lead capture.',
    stack: ['Web', 'UI/UX'],
    images: [ekody1],
  },
];

export default projects;
