import { ProjectCard, CardProps } from "../components/ui/project-card";

export default {
    title: "Project Card",
    component: ProjectCard,
    parameters: {
        layout: 'centered',
    },
    tags: ["autodocs"],
}

export const Default = {
    args: {
        title: "Gum",
        grant_round: false,
        image: "https://pbs.twimg.com/profile_images/1621492955868545024/CpsOM4M3_400x400.jpg",
        contributors: 324,
        matched: "$69",
        short_description: "Solana Social Legos: Build Sticky apps with ease"
    }
}
