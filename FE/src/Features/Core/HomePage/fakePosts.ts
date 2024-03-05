interface Post {
    id: string;
    subReddit: {
        id: string;
        image: String;
        title: String;
    };
    title: String;
    description: string;
    links: string;
    votes: number;
    comments: number;
}
export const fakePosts: Post[] = [
    {
        id: "1",
        subReddit: {
            id: "subreddit1",
            image: "/logo.png",
            title: "Subreddit 1"
        },
        title: "Title 1",
        description: "Description 1",
        links: "Links 1",
        comments: 20,
        votes: 10,
    },
    {
        id: "2",
        subReddit: {
            id: "subreddit2",
            image: "/logo.png",
            title: "Subreddit 2"
        },
        title: "Title 2",
        description: "Description 2",
        links: "Links 2",
        comments: 20,
        votes: 20,
    },
    {
        id: "3",
        subReddit: {
            id: "subreddit3",
            image: "/logo.png",
            title: "Subreddit 3"
        },
        title: "Title 3",
        description: "Description 3",
        links: "Links 3",
        comments: 20,
        votes: 30
    },
    {
        id: "4",
        subReddit: {
            id: "subreddit4",
            image: "/logo.png",
            title: "Subreddit 4"
        },
        title: "Title 4",
        description: "Description 4",
        links: "Links 4",
        comments: 20,
        votes: 40
    },
    {
        id: "5",
        subReddit: {
            id: "subreddit5",
            image: "/logo.png",
            title: "Subreddit 5"
        },
        title: "Title 5",
        description: "Description 5",
        links: "Links 5",
        comments: 20,
        votes: 50
    },
    {
        id: "6",
        subReddit: {
            id: "subreddit6",
            image: "/logo.png",
            title: "Subreddit 6"
        },
        title: "Title 6",
        description: "Description 6",
        links: "Links 6",
        comments: 20,
        votes: 60
    },
    {
        id: "7",
        subReddit: {
            id: "subreddit7",
            image: "/logo.png",
            title: "Subreddit 7"
        },
        title: "Title 7",
        description: "Description 7",
        links: "Links 7",
        comments: 20,
        votes: 70
    },
    {
        id: "8",
        subReddit: {
            id: "subreddit8",
            image: "/logo.png",
            title: "Subreddit 8"
        },
        title: "Title 8",
        description: "Description 8",
        links: "Links 8",
        comments: 20,
        votes: 80
    },
    {
        id: "9",
        subReddit: {
            id: "subreddit9",
            image: "/logo.png",
            title: "Subreddit 9"
        },
        title: "Title 9",
        description: "Description 9",
        links: "Links 9",
        comments: 20,
        votes: 90
    },
    {
        id: "10",
        subReddit: {
            id: "subreddit10",
            image: "/logo.png",
            title: "Subreddit 10"
        },
        title: "Title 10",
        description: "Description 10",
        links: "Links 10",
        comments: 20,
        votes: 100
    }
];