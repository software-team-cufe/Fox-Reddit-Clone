export const modSettingsItems = [
    {
        sectionName: "Post Requirements",
        items: [
            {
                type: "switch",
                title: "Provide members with posting guidelines",
                subTitle: "Posting guidelines let people who are new to your community or posting for the first time know what your expectations are. If you have specific flair or formatting requirements for posts, this is the place to make it clear what you’d like.",
                name: "membersWithGuidelines",
            },
            {
                type: "switch",
                title: "Require words in the post title",
                subTitle: "Posts without these words in the title can’t be submitted. (Choose up to 15 words, 40 characters each.)",
                name: "requirePostTitles",
            },
            {
                type: "switch",
                title: "Ban words from the post title",
                subTitle: "Posts with these words in the title can’t be submitted. (Choose up to 15 words, 40 characters each.)",
                name: "banWordsFromPostTitle",
            },
            {
                type: "switch",
                title: "Ban words from the post body",
                subTitle: "Posts with these words in the body can’t be submitted. (Choose up to 15 words, 40 characters each.)",
                name: "banWordsFromPostBody",
            },
            {
                type: "switch",
                title: "Require or ban links from specific domains",
                subTitle: "Posts with links that don’t fit your requirements can’t be submitted.",
                name: "banLinksFromDomains",
            },
            {
                type: "switch",
                title: "Restrict how often the same link can be posted",
                subTitle: "Posts that have a link that has already been posted to your community cannot be submitted within the number of days you select.",
                name: "restrictSameLinkPosted",
            },
        ],
    },
    {
        sectionName: "Advanced post requirements",
        items: [
            {
                type: "switch",
                title: "Require post flair",
                subTitle: "Posts without flair can’t be submitted. (Note that this requirement is ignored if your community hasn’t set up flair yet.)",
                name: "",
            },
            {
                type: "switch",
                title: "Restrict post title length",
                subTitle: "Set a minimum and/or maximum post title length",
                name: "",
            },
            {
                type: "switch",
                title: "Use title text RegEx requirements",
                subTitle: "Use regular expressions for more advanced title matching. These use the Python RegEx syntax",
                name: "",
            },
            {
                type: "switch",
                title: "Use body text RegEx requirements",
                subTitle: "Use regular expressions for more advanced body text matching. These use the Python RegEx syntax",
                name: "",
            },
            
        ],
    },
    
]