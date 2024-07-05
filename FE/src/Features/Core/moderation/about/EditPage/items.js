export const postandCommentItems = [
    {
        sectionName: "Post Requirements",
        items: [
            {
                type: "list",
                title: "Post type options",
                subTitle: "",
                name: "postType",
                items: [
                    "Any",
                    "Links only",
                    "Text Posts Only"
                ],
            },
            {
                type: "switch",
                title: "Archive posts",
                subTitle: "Don’t allow commenting or voting on posts older than 6 months",
                name: "activePosts",
            },
            {
                type: "switch",
                title: "Enable spoiler tag",
                subTitle: "Media on posts with the spoiler tag are blurred",
                name: "spoilerTag",
            },
            {
                type: "switch",
                title: "Allow image uploads and links to image hosting sites",
                subTitle: "",
                name: "allowImageUpload",
            },
            {
                type: "switch",
                title: "Allow multiple images per post",
                subTitle: "",
                name: "multiplePosts",
            },
            {
                type: "switch",
                title: "Allow polls",
                subTitle: "",
                name: "allowPolls",
            },
            {
                type: "list",
                title: "Posts",
                subTitle: "",
                items: [
                    "Low",
                    "High (Default)",
                    "All",
                ],
                name: "posts",
            },
            {
                type: "list",
                title: "Links",
                subTitle: "",
                items: [
                    "Low",
                    "High (Default)",
                    "All",
                ],
                name: "links",
            },
            {
                type: "list",
                title: "Comments",
                subTitle: "",
                items: [
                    "Low (Default)",
                    "High",
                    "All",
                ],
                name: "comments",
            },
        ],
    },
    
    {
        sectionName: "COMMENTS",
        items: [
            {
                type: "list",
                title: "Suggested sort",
                subTitle: "All comment feeds in community will default to this sort setting",
                name: "suggestedSort",
                items: [
                    "none (recommended)",
                    "best",
                    "old",
                    "top",
                    "Q&A",
                    "Live (Beta)",
                    "controversial",
                    "new",
                ],
            },
            {
                type: "switch",
                title: "Collapse deleted and removed comments",
                subTitle: "",
                name: "collapseAndDeleteRemovedComments",
            },
            {
                type: "number",
                title: "Minutes to hide comment scores",
                subTitle: "",
                name: "minsToHideComment",
            },
            {
                type: "switch",
                title: "GIFs from GIPHY",
                subTitle: "Allow comments with GIFs from GIPHY.",
                name: "allowCommentsWithGifs",
            },
            {
                type: "switch",
                title: "Collectible Expressions",
                subTitle: "Allow comments with Collectible Expressions.",
                name: "allowCommentsWithCollectibleExpressions",
            },
            {
                type: "switch",
                title: "Images",
                subTitle: "Allow comments with uploaded images.",
                name: "allowCommentsWithUploadedImages",
            },
            {
                type: "switch",
                title: "GIFs",
                subTitle: "Allow comments with uploaded GIFs.",
                name: "allowCommentsWithUploadedGIFs",
            },
            
        ],
    },
    
    
]