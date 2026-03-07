export interface PortfolioData {
    id: string;
    name: string;
    role: string;
    description: string;
    folderPath: string;
    galaxyFolderPath: string;
    themeColor: string;
    gradient: string;
    techStack: string[];
    quotes: { title: string; subtitle: string }[];
    aboutMeSection: { title: string; paragraphs: string[]; thoughts: string[] };
    experienceSection: { title: string; roles: { company: string; position: string; duration: string; description: string }[] };
    projectsSection: { title: string; projects: { name: string; tech: string; description: string }[] };
    detailsSection: { title: string; description: string; imageAlt: string };
    architectureSection: { title: string; description: string };
    linksSection: {
        status: string;
        type: string;
        keyFeatures: string[];
        deployment: string;
        githubPolicy: string;
    };
}

export const portfolio: PortfolioData = {
    id: "portfolio",
    name: "RUSHIKESH",
    role: "Creative Developer",
    description: "Driven by an endless sense of curiosity.",
    folderPath: "/blackhole_frames",
    galaxyFolderPath: "/galaxy_being_frames",
    themeColor: "#FF3366", // A crazy bright accent color to blend beautifully
    gradient: "linear-gradient(135deg, #0a0015 0%, #3a0066 100%)",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Canvas"],

    // Intense space quotes mixed with personal story, synced to the visual journey
    quotes: [
        { title: "Black hole.", subtitle: "The True meaning of life is just a void where you are trying to find the light." },
        { title: "Driven by curiosity.", subtitle: "Viewing the world through a completely different lens." },
        { title: "The value of solitude.", subtitle: "Learning to appreciate the tiniest details of life." },
        { title: "A profound shift.", subtitle: "Losing my mother at 10 forced me to grow up fast." },
        { title: "Heavy responsibility.", subtitle: "I was still just a child trying to find my way." },
        { title: "Event Horizon.", subtitle: "The boundary of no return for my creative journey." },
        { title: "A child's promise.", subtitle: "I swore to always follow my heart." },
        { title: "\"I will support you.\"", subtitle: "My mother's words became my anchor." },
        { title: "Spaghettification.", subtitle: "The ultimate stretch of reality at the edge of the unknown." },
        { title: "Constant reflection.", subtitle: "Are my choices today honoring that promise?" },
        { title: "An analytical mind.", subtitle: "Analyzing every scenario to stay on the right path." },
        { title: "Into the Singularity.", subtitle: "Where passion and curiosity converge entirely." }
    ],

    aboutMeSection: {
        title: "My Story",
        paragraphs: [
            "My name is Kayala Rushikesh Goud, born and raised in Hyderabad, Telangana. Growing up, I was a kid driven by an endless sense of curiosity. I was always an overthinker, which shaped my mind to view the world through a completely different lens than most. While being different sometimes made me feel isolated from society, the solitude taught me something valuable: when you are alone, you learn to appreciate the tiniest details of life.",
            "My life shifted dramatically when I was 10 years old and lost my mother. That loss forced me to grow up fast. I became highly responsible, over-analyzing my actions to make sure my choices never hurt anyone. But beneath that heavy responsibility, I was still just a child trying to find my way.",
            "As I grew older and started searching for my true passion, a memory struck me. When I was seven, I promised my mother that I would always follow my heart. I remembered her telling me, 'Whatever it is, I will support you.' Those words became my anchor. They constantly play in my head, pushing me to ask myself if the things I do today are truly honoring that promise. My overthinking nature makes me analyze every possible scenario to make sure I am on the right path—that was how my mind worked then, and it is exactly how it works now."
        ],
        thoughts: [
            "My name is Kayala Rushikesh Goud.",
            "Born and raised in Hyderabad.",
            "Growing up, I was driven by an endless sense of curiosity.",
            "I was always an overthinker...",
            "...which shaped my mind to view the world through a completely different lens.",
            "While being different sometimes made me feel isolated...",
            "...the solitude taught me something valuable.",
            "When you are alone, you learn to appreciate the tiniest details.",
            "My life shifted dramatically when I was 10 years old.",
            "I lost my mother.",
            "That loss forced me to grow up fast.",
            "I became highly responsible, over-analyzing to never hurt anyone.",
            "But beneath that heavy responsibility...",
            "...I was still just a child trying to find my way.",
            "As I searched for my true passion, a memory struck me.",
            "When I was seven, I promised my mother I would follow my heart.",
            "\"Whatever it is, I will support you.\"",
            "Those words became my anchor.",
            "They constantly push me to ask if my choices today honor that promise.",
            "My overthinking nature makes me analyze every scenario to stay on the right path.",
            "That is exactly how my mind works now."
        ]
    },

    experienceSection: {
        title: "Experience",
        roles: [
            {
                company: "Creative Developer",
                position: "Freelance",
                duration: "Present",
                description: "Designing and developing immersive scrollytelling web experiences, blending 3D rendering with cutting-edge front-end technologies to deliver award-winning level websites."
            },
            {
                company: "AI & Full-Stack Engineering",
                position: "Independent Researcher",
                duration: "2023 - Present",
                description: "Building bleeding-edge AI integrations, computer vision pipelines, and intelligent backends to power massive datasets and real-time processing."
            }
        ]
    },

    projectsSection: {
        title: "Featured Work",
        projects: [
            {
                name: "Singularity AI",
                tech: "Python, TensorFlow, Next.js",
                description: "An AI product designed to process massive datasets in real-time. Custom transformer architectures built to handle edge-case scenarios."
            },
            {
                name: "Accretion Disk",
                tech: "Godot, GDScript, Blender",
                description: "A fully realized 3D RPG survival adventure game. Custom shaders, aggressive frustum culling, and a responsive physics engine."
            },
            {
                name: "Neural Vision",
                tech: "YOLO, OpenCV, Python",
                description: "Advanced computer vision utilizing YOLO for high-speed, high-accuracy hand pose estimation with zero bottlenecking."
            }
        ]
    },

    detailsSection: {
        title: "The Journey",
        description: "My journey started with a deep curiosity about how things work behind the screen. Over time, I've gathered knowledge across modern web technologies to build interfaces that aren't just functional, but memorable. Every line of code is a step toward mastering the craft.",
        imageAlt: "Developer Mindset"
    },
    architectureSection: {
        title: "The Stack",
        description: "Utilizing modern frameworks like Next.js mapped with fluid animations from Framer Motion. It's about combining structural integrity with creative freedom to deliver stellar performance."
    },
    linksSection: {
        status: "Available",
        type: "Freelance / Full-time",
        keyFeatures: ["Responsive Design", "Performance Focused", "Creative Execution"],
        deployment: "Open to new opportunities and exciting projects.",
        githubPolicy: "Check out my repositories to see my code in action."
    }
};
