import { BarChart3, BookHeart, CalendarCheck, CircleUser, List, Mail, ScrollText, Settings2, Tag } from "lucide-react";

export const modNavbarItems = [
    {
        collectionName: "OVERVIEW",
        items: [
            {
                name: "Queues",
                link: "",
                icon: BookHeart ,
                newTap: false,
            },
            {
                name: "ModMail",
                link: "",
                icon: Mail ,
                newTap: false,
            },
            {
                name: "Scheduled Posts",
                link: "",
                icon: CalendarCheck ,
                newTap: false,
            },
            {
                name: "User Management",
                link: "/user-management/banned",
                icon: CircleUser ,
                newTap: false,
            },
            {
                name: "Insights",
                link: "",
                icon: BarChart3 ,
                newTap: false,
            },
        ],
    },
    {
        collectionName: "MODERATION",
        items: [
            {
                name: "Rules and Removal Reasons",
                link: "",
                icon: ScrollText ,
                newTap: false,
            },
            {
                name: "User Flair",
                link: "",
                icon: Tag ,
                newTap: false,
            },
            {
                name: "Content Controls",
                link: "",
                icon: Settings2 ,
                newTap: false,
            },
            {
                name: "Mod Log",
                link: "",
                icon: List ,
                newTap: false,
            },
            
        ],
    },
];