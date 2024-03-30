import React from "react";
import CommentComponent from "@/GeneralComponents/Comment/CommentComponent"
import TextBox from "@/GeneralElements/TextBox/TextBox"

const comments = [
  {
    user: {
      image: "https://t3.ftcdn.net/jpg/05/85/86/44/360_F_585864419_kgIYUcDQ0yiLOCo1aRjeu7kRxndcoitz.jpg",
      name: "",
    },
    content: {
      text: "You mean random web development facts most web developer will already know?",
    },
    info: {
      time: "14h ago",
      votes: 14,
    },
    comments: [
      {
        user: {
          image: "https://t3.ftcdn.net/jpg/05/85/86/44/360_F_585864419_kgIYUcDQ0yiLOCo1aRjeu7kRxndcoitz.jpg",
          name: "",
        },
        content: {
          text: "yyyyyyyyyyyYou mean random web development facts most web developer will already know?",
        },
        info: {
          time: "14h ago",
          votes: 14,
        },
        comments: [
          {
            user: {
              image: "https://t3.ftcdn.net/jpg/05/85/86/44/360_F_585864419_kgIYUcDQ0yiLOCo1aRjeu7kRxndcoitz.jpg",
              name: "",
            },
            content: {
              text: "You mean random web development facts most web developer will already know?",
            },
            info: {
              time: "14h ago",
              votes: 14,
            },
          },
          
          {
            user: {
              image: "https://t3.ftcdn.net/jpg/05/85/86/44/360_F_585864419_kgIYUcDQ0yiLOCo1aRjeu7kRxndcoitz.jpg",
              name: "",
            },
            content: {
              text: "You mean random web development facts most web developer will already know?",
            },
            info: {
              time: "14h ago",
              votes: 14,
            },
          },
          
          {
            user: {
              image: "https://t3.ftcdn.net/jpg/05/85/86/44/360_F_585864419_kgIYUcDQ0yiLOCo1aRjeu7kRxndcoitz.jpg",
              name: "",
            },
            content: {
              text: "You mean random web development facts most web developer will already know?",
            },
            info: {
              time: "14h ago",
              votes: 14,
            },
          },
          
          {
            user: {
              image: "https://t3.ftcdn.net/jpg/05/85/86/44/360_F_585864419_kgIYUcDQ0yiLOCo1aRjeu7kRxndcoitz.jpg",
              name: "",
            },
            content: {
              text: "You mean random web development facts most web developer will already know?",
            },
            info: {
              time: "14h ago",
              votes: 14,
            },
          },
          
          {
            user: {
              image: "https://t3.ftcdn.net/jpg/05/85/86/44/360_F_585864419_kgIYUcDQ0yiLOCo1aRjeu7kRxndcoitz.jpg",
              name: "",
            },
            content: {
              text: "You mean random web development facts most web developer will already know?",
            },
            info: {
              time: "14h ago",
              votes: 14,
            },
          },
          
        ],
      },
      
      {
        user: {
          image: "https://t3.ftcdn.net/jpg/05/85/86/44/360_F_585864419_kgIYUcDQ0yiLOCo1aRjeu7kRxndcoitz.jpg",
          name: "",
        },
        content: {
          text: "You mean random web development facts most web developer will already know?",
        },
        info: {
          time: "14h ago",
          votes: 14,
        },
      },
      
      {
        user: {
          image: "https://t3.ftcdn.net/jpg/05/85/86/44/360_F_585864419_kgIYUcDQ0yiLOCo1aRjeu7kRxndcoitz.jpg",
          name: "",
        },
        content: {
          text: "You mean random web development facts most web developer will already know?",
        },
        info: {
          time: "14h ago",
          votes: 14,
        },
      },
      
      {
        user: {
          image: "https://t3.ftcdn.net/jpg/05/85/86/44/360_F_585864419_kgIYUcDQ0yiLOCo1aRjeu7kRxndcoitz.jpg",
          name: "",
        },
        content: {
          text: "You mean random web development facts most web developer will already know?",
        },
        info: {
          time: "14h ago",
          votes: 14,
        },
      },
      
      {
        user: {
          image: "https://t3.ftcdn.net/jpg/05/85/86/44/360_F_585864419_kgIYUcDQ0yiLOCo1aRjeu7kRxndcoitz.jpg",
          name: "",
        },
        content: {
          text: "You mean random web development facts most web developer will already know?",
        },
        info: {
          time: "14h ago",
          votes: 14,
        },
      },
      
    ],
  },
  {
    user: {
      image: "https://t3.ftcdn.net/jpg/05/85/86/44/360_F_585864419_kgIYUcDQ0yiLOCo1aRjeu7kRxndcoitz.jpg",
      name: "",
    },
    content: {
      text: "You mean random web development facts most web developer will already know?",
    },
    info: {
      time: "14h ago",
      votes: 14,
    },
    comments: [
      {
        user: {
          image: "https://t3.ftcdn.net/jpg/05/85/86/44/360_F_585864419_kgIYUcDQ0yiLOCo1aRjeu7kRxndcoitz.jpg",
          name: "",
        },
        content: {
          text: "You mean random web development facts most web developer will already know?",
        },
        info: {
          time: "14h ago",
          votes: 14,
        },
      },
    ],
  },
  {
    user: {
      image: "https://t3.ftcdn.net/jpg/05/85/86/44/360_F_585864419_kgIYUcDQ0yiLOCo1aRjeu7kRxndcoitz.jpg",
      name: "",
    },
    content: {
      text: "You mean random web development facts most web developer will already know?",
    },
    info: {
      time: "14h ago",
      votes: 14,
    },
    comments: [
      {
        user: {
          image: "https://t3.ftcdn.net/jpg/05/85/86/44/360_F_585864419_kgIYUcDQ0yiLOCo1aRjeu7kRxndcoitz.jpg",
          name: "",
        },
        content: {
          text: "You mean random web development facts most web developer will already know?",
        },
        info: {
          time: "14h ago",
          votes: 14,
        },
      },
    ],
  },
]



export default function CommentSection() {
  return (
    <div>
      <TextBox placeholder="Add a comment" className=" rounded-2xl mb-6" />
      {
        comments.map((e, idx) => <CommentComponent comment={e} key={idx} />)
      }
    </div>
  )
}
