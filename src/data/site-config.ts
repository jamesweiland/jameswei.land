import hero from '../assets/images/lions_head.jpeg';
import type { SiteConfig } from '../types';

const siteConfig: SiteConfig = {
    website: 'https://jameswei.land',
    title: 'James Weiland',
    subtitle: 'Software Engineer based in NYC',
    description: 'My website to show off my portfolio and interests',
    headerNavLinks: [
        {
            text: 'Home',
            href: '/'
        },
        {
            text: 'About Me',
            href: '/about'
        },
        {
            text: 'Blog',
            href: '/blog'
        },
        {
            text: 'Projects',
            href: '/projects'
        },
        {
            text: 'Contact',
            href: '/contact'
        }
    ],
    footerNavLinks: [
        {
            text: 'View the source code',
            href: 'https://github.com/jweiland/portfolio'
        },
    ],
    hero: {
        title: 'Welcome to my website!',
        image: {
            src: hero,
            alt: 'Me at the top of Lion\'s Head in Cape Town, South Africa',
            caption: 'This is a picture of me at the top of Lion\'s Head in Cape Town that I thought looked cool.' 
        },
        actions: [
            {
                text: 'Get in Touch',
                href: '/contact'
            }
        ]
    },
    subscribe: {
        enabled: false,
        title: 'Subscribe to Dante Newsletter',
        text: 'One update per week. All the latest posts directly in your inbox.',
        form: {
            action: '#'
        }
    },
    postsPerPage: 8,
    projectsPerPage: 8
};

export default siteConfig;
