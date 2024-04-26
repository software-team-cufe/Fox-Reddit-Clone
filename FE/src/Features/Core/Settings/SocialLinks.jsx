import React, { useState, useEffect } from 'react'
import { X, ArrowLeft } from "lucide-react";
import axios from "axios";

function SocialLinks({ handleOpenLinkPop, hide, DisableSL }) {
    const ButtonsWithoutCustomLink = [
        { icon: "/instagram.png", linkName: "Instagram", userName: "", link: "https://www.instagram.com/" },
        { icon: "/linktree.png", linkName: "Linktree", userName: "", link: "https://linktr.ee/" },
        { icon: "/beacons.png", linkName: "Beacons", userName: "", link: "https://beacons.ai/" },
        { icon: "/soundcloud.png", linkName: "SoundCloud", userName: "", link: "https://soundcloud.com/" },
        { icon: "/tumblr.png", linkName: "Tumblr", userName: "", link: "https://www.tumblr.com/" },
        { icon: "/twitch.png", linkName: "Twitch", userName: "", link: "https://www.twitch.tv/" },
        { icon: "/tiktok.png", linkName: "Tiktok", userName: "", link: "https://www.tiktok.com/" },
        { icon: "/twitter.png", linkName: "Twitter", userName: "", link: "https://twitter.com/" },
        { icon: "/buy_me_a_coffee.png", linkName: "Buy Me a Coffee", userName: "", link: "https://buymeacoffee.com/" },
        { icon: "/onlyfans.png", linkName: "OnlyFans", userName: "", link: "https://onlyfans.com/" },
        { icon: "/patreon.png", linkName: "Patreon", userName: "", link: "https://www.patreon.com/" },
        { icon: "/cameo.png", linkName: "Cameo", userName: "", link: "https://www.cameo.com/" },
        { icon: "/venmo.png", linkName: "Venmo", userName: "", link: "https://venmo.com/" },
        { icon: "/paypal.png", linkName: "Paypal", userName: "", link: "https://www.paypal.com/eg/" },
        { icon: "/kofi.png", linkName: "Kofi", userName: "", link: "https://ko-fi.com/" }]

    const [UserSocialLinks, setUserSocialLinks] = useState([]);

    const [OpenCustomLink, setOpenCustomLink] = useState(false);
    const [CustomLinkeLable, setCustomLinkeLable] = useState("");
    const [CustomLinkvalue, setCustomLinkvalue] = useState("");
    const [DisableSaveCL, setDisableSaveCL] = useState(true);
    const [CLWarnMess, setCLWarnMess] = useState(false);

    const [OpenFoxLink, setOpenFoxLink] = useState(false);
    const [FoxLinkWarning, setFoxLinkWarning] = useState(false);
    const [FoxLinkValue, setFoxLinkValue] = useState("");
    const [DisableSaveFL, setDisableSaveFL] = useState(true);

    const [OpenFBLink, setOpenFBLink] = useState(false);
    const [FBLinkeLable, setFBLinkeLable] = useState("");
    const [FBLinkvalue, setFBLinkvalue] = useState("");
    const [DisableSaveFB, setDisableSaveFB] = useState(true);
    const [FBWarnMess, setFBWarnMess] = useState(false);

    const [OpenyoutubeLink, setOpenyoutubeLink] = useState(false);
    const [youtubeLinkeLable, setyoutubeLinkeLable] = useState("");
    const [youtubeLinkvalue, setyoutubeLinkvalue] = useState("");
    const [DisableSaveyoutube, setDisableSaveyoutube] = useState(true);
    const [youtubeWarnMess, setyoutubeWarnMess] = useState(false);

    const [OpenSpotifyLink, setOpenSpotifyLink] = useState(false);
    const [SpotifyLinkeLable, setSpotifyLinkeLable] = useState("");
    const [SpotifyLinkvalue, setSpotifyLinkvalue] = useState("");
    const [DisableSaveSpotify, setDisableSaveSpotify] = useState(true);
    const [SpotifyWarnMess, setSpotifyWarnMess] = useState(false);

    const [OpenDiscordLink, setOpenDiscordLink] = useState(false);
    const [DiscordLinkeLable, setDiscordLinkeLable] = useState("");
    const [DiscordLinkvalue, setDiscordLinkvalue] = useState("");
    const [DisableSaveDiscord, setDisableSaveDiscord] = useState(true);
    const [DiscordWarnMess, setDiscordWarnMess] = useState(false);

    const [OpenSubstackLink, setOpenSubstackLink] = useState(false);
    const [SubstackLinkeLable, setSubstackLinkeLable] = useState("");
    const [SubstackLinkvalue, setSubstackLinkvalue] = useState("");
    const [DisableSaveSubstack, setDisableSaveSubstack] = useState(true);
    const [SubstackWarnMess, setSubstackWarnMess] = useState(false);

    const [OpenkickstarterLink, setOpenkickstarterLink] = useState(false);
    const [kickstarterLinkeLable, setkickstarterLinkeLable] = useState("");
    const [kickstarterLinkvalue, setkickstarterLinkvalue] = useState("");
    const [DisableSavekickstarter, setDisableSavekickstarter] = useState(true);
    const [kickstarterWarnMess, setkickstarterWarnMess] = useState(false);

    const [OpenShopifyLink, setOpenShopifyLink] = useState(false);
    const [ShopifyLinkeLable, setShopifyLinkeLable] = useState("");
    const [ShopifyLinkvalue, setShopifyLinkvalue] = useState("");
    const [DisableSaveShopify, setDisableSaveShopify] = useState(true);
    const [ShopifyWarnMess, setShopifyWarnMess] = useState(false);

    const [OpenMapped, setOpenMapped] = useState(false);
    const [SelectedButton, setSelectedButton] = useState(null);
    const [DisableSaveSelected, setDisableSaveSlected] = useState(true);
    const [UserNameValue, setUserNameValue] = useState('');
    const [openUserLinkPop, setopenUserLinkPop] = useState(false);
    const [DisableSaveUserLink, setDisableSaveUserLink] = useState(true);
    const [UserNameUserLink, setUserNameUserLink] = useState('');
    const [SelectedButtonUL, setSelectedButtonUL] = useState(null);

    useEffect(() => {
        fetchUserLinks();
    }, [])

    //Enable and Disable save buttons
    //handle Custom link
    useEffect(() => {
        if (CustomLinkvalue.length !== 0 && CustomLinkeLable.length !== 0) {
            setDisableSaveCL(false);
        } else {
            setDisableSaveCL(true);
        }
    }, [CustomLinkvalue, CustomLinkeLable]);
    //handle Shopify link
    useEffect(() => {
        if (ShopifyLinkvalue.length !== 0 && ShopifyLinkeLable.length !== 0) {
            setDisableSaveShopify(false);
        } else {
            setDisableSaveShopify(true);
        }

    }, [ShopifyLinkvalue, ShopifyLinkeLable]);
    //handle kickstarter link
    useEffect(() => {
        if (kickstarterLinkvalue.length !== 0 && kickstarterLinkeLable.length !== 0) {
            setDisableSavekickstarter(false);
        } else {
            setDisableSavekickstarter(true);
        }

    }, [kickstarterLinkvalue, kickstarterLinkeLable]);
    //handle Substack link
    useEffect(() => {
        if (SubstackLinkvalue.length !== 0 && SubstackLinkeLable.length !== 0) {
            setDisableSaveSubstack(false);
        } else {
            setDisableSaveSubstack(true);
        }

    }, [SubstackLinkvalue, SubstackLinkeLable]);
    //handle Discord link
    useEffect(() => {
        if (DiscordLinkvalue.length !== 0 && DiscordLinkeLable.length !== 0) {
            setDisableSaveDiscord(false);
        } else {
            setDisableSaveDiscord(true);
        }

    }, [DiscordLinkvalue, DiscordLinkeLable]);
    //handle Spotify link
    useEffect(() => {
        if (SpotifyLinkvalue.length !== 0 && SpotifyLinkeLable.length !== 0) {
            setDisableSaveSpotify(false);
        } else {
            setDisableSaveSpotify(true);
        }

    }, [SpotifyLinkvalue, SpotifyLinkeLable]);
    //handle youtube link
    useEffect(() => {
        if (youtubeLinkvalue.length !== 0 && youtubeLinkeLable.length !== 0) {
            setDisableSaveyoutube(false);
        } else {
            setDisableSaveyoutube(true);
        }

    }, [youtubeLinkvalue, youtubeLinkeLable]);
    useEffect(() => {
        if (FBLinkvalue.length !== 0 && FBLinkeLable.length !== 0) {
            setDisableSaveFB(false);
        } else {
            setDisableSaveFB(true);
        }

    }, [FBLinkvalue, FBLinkeLable]);
    useEffect(() => {
        if (UserNameValue.length === 0) {
            setDisableSaveSlected(true);

        }
        else {
            setDisableSaveSlected(false);
        }
    }, [UserNameValue])
    useEffect(() => {
        if (FoxLinkValue.length === 0) {
            setDisableSaveFL(true);

        }
        else {
            setDisableSaveFL(false);
        }
    }, [FoxLinkValue])
    useEffect(() => {
        if (FoxLinkValue.length === 0) {
            setDisableSaveFL(true);

        }
        else {
            setDisableSaveFL(false);
        }
    }, [FoxLinkValue])
    useEffect(() => {
        if (UserNameUserLink.length === 0) {
            setDisableSaveUserLink(true);

        }
        else {
            setDisableSaveUserLink(false);
        }
    }, [UserNameUserLink])
    useEffect(() => {
        if (UserSocialLinks.length <= 4)
            DisableSL(false);
        else
            DisableSL(true);
    }, [UserSocialLinks])

    const fetchUserLinks = async () => {
        try {
            const res = await axios.get('http://localhost:3002/users/1');
            setUserSocialLinks(res.data.SocialLinks);
        } catch (ex) {
            console.error(ex);
            if (ex.issues != null && ex.issues.length != 0) {
                toast.error(ex.issues[0].message);
            }
        }
    }

    const handleCustomLinkValue = (e) => {
        if (CustomLinkvalue.length === 0 && !(e.target.value.includes('https://')))
            setCustomLinkvalue("https://" + e.target.value)
        else
            setCustomLinkvalue(e.target.value)
    }
    const handleSaveCustomLink = async () => {
        if (!(CustomLinkvalue.startsWith("https://") && CustomLinkvalue.includes("."))) {
            setCLWarnMess(true);
        }
        else {
            setCLWarnMess(false);

            const newSocialLink = {
                icon: "/link.png",
                linkName: "Custom link",
                userName: CustomLinkeLable,
                link: CustomLinkvalue
            }
            const updatedSL = [...UserSocialLinks, newSocialLink]
            const res = await axios.patch(`http://localhost:3002/users/1`, { SocialLinks: updatedSL });
            setUserSocialLinks(updatedSL);
            setOpenCustomLink(false);
            setCustomLinkeLable('');
            setCustomLinkvalue('');

        }

    }
    //handl Fox link
    const handleSaveFoxLink = async () => {
        if (FoxLinkValue.startsWith("r/") || FoxLinkValue.startsWith("u/")) {
            //check if user exits
            if (FoxLinkValue.startsWith("u/")) {
                const response = await axios.get(`http://localhost:3002/users`)
                    .catch(err => console.error(err));
                for (const user of response.data) {
                    if (user.name === FoxLinkValue.slice(2)) {

                        const newSocialLink = {
                            icon: "/logo.png",
                            linkName: "Fox",
                            userName: FoxLinkValue,
                            link: "http://devopsagmdmnfront.southafricanorth.cloudapp.azure.com/" + FoxLinkValue
                        }
                        const updatedSL = [...UserSocialLinks, newSocialLink]
                        const res = await axios.patch(`http://localhost:3002/users/1`, { SocialLinks: updatedSL });
                        setUserSocialLinks(updatedSL);
                        setOpenFoxLink(false);
                        setFoxLinkValue('');
                    }
                    else
                        setFoxLinkWarning(true);
                }
            }
            if (FoxLinkValue.startsWith("r/")) {
                const response = await axios.get(`http://localhost:3002/communities`)
                    .catch(err => console.error(err));
                for (const user of response.data) {
                    if (user.name === FoxLinkValue.slice(2)) {
                        //To Do: API
                        const newSocialLink = {
                            icon: "/logo.png",
                            linkName: "Fox",
                            userName: FoxLinkValue,
                            link: "http://devopsagmdmnfront.southafricanorth.cloudapp.azure.com/" + FoxLinkValue
                        }
                        const updatedSL = [...UserSocialLinks, newSocialLink]
                        //const res = await axios.patch(`http://localhost:3002/users/1`, { SocialLinks: updatedSL });
                        setUserSocialLinks(updatedSL);
                        setOpenFoxLink(false);
                        setFoxLinkValue('');
                    }
                    else
                        setFoxLinkWarning(true);
                }
            }
        }
        else {
            setDisableSaveFL(true);
            setFoxLinkWarning(true);
        }
    }

    //handle Facebook link
    const handleFBLinkValue = (e) => {
        if (FBLinkvalue.length === 0 && !(e.target.value.includes('https://')))
            setFBLinkvalue("https://" + e.target.value)
        else
            setFBLinkvalue(e.target.value)
    }
    const handleSaveFBLink = async () => {
        if (FBLinkvalue.startsWith("https://facebook.com") ||
            FBLinkvalue.startsWith("https://Facebook.com") ||
            FBLinkvalue.startsWith("https://facebook.com/") ||
            FBLinkvalue.startsWith("https://Facebook.com/" ||
                FBLinkvalue.startsWith("https://www.facebook.com") ||
                FBLinkvalue.startsWith("https://www.Facebook.com") ||
                FBLinkvalue.startsWith("https://www.facebook.com/") ||
                FBLinkvalue.startsWith("https://www.Facebook.com/")
            )) {
            setFBWarnMess(false);

            const newSocialLink = {
                icon: "/facebook.png",
                linkName: "Facebook",
                userName: FBLinkeLable,
                link: FBLinkvalue
            }
            const updatedSL = [...UserSocialLinks, newSocialLink]
            const res = await axios.patch(`http://localhost:3002/users/1`, { SocialLinks: updatedSL });
            setUserSocialLinks(updatedSL);
            setOpenFBLink(false);
            setFBLinkvalue('');
            setFBLinkeLable('');

        }
        else
            setFBWarnMess(true);
    }


    const handleyoutubeLinkValue = (e) => {
        if (youtubeLinkvalue.length === 0 && !(e.target.value.includes('https://')))
            setyoutubeLinkvalue("https://" + e.target.value)
        else
            setyoutubeLinkvalue(e.target.value)
    }
    const handleSaveyoutubeLink = async () => {
        if (youtubeLinkvalue.startsWith("https://youtube.com") ||
            youtubeLinkvalue.startsWith("https://Youtube.com") ||
            youtubeLinkvalue.startsWith("https://youtube.com/") ||
            youtubeLinkvalue.startsWith("https://Youtube.com/") ||
            youtubeLinkvalue.startsWith("https://www.youtube.com") ||
            youtubeLinkvalue.startsWith("https://www.Youtube.com") ||
            youtubeLinkvalue.startsWith("https://www.youtube.com/") ||
            youtubeLinkvalue.startsWith("https://www.Youtube.com/")) {
            setyoutubeWarnMess(false);

            const newSocialLink = {
                icon: "/youtube.png",
                linkName: "Youtube",
                userName: youtubeLinkeLable,
                link: youtubeLinkvalue
            }
            const updatedSL = [...UserSocialLinks, newSocialLink]
            const res = await axios.patch(`http://localhost:3002/users/1`, { SocialLinks: updatedSL });
            setUserSocialLinks(updatedSL);
            setOpenyoutubeLink(false);
            setyoutubeLinkeLable('');
            setyoutubeLinkvalue('');

        }
        else
            setyoutubeWarnMess(true);
    }

    const handleSpotifyLinkValue = (e) => {
        if (SpotifyLinkvalue.length === 0 && !(e.target.value.includes('https://')))
            setSpotifyLinkvalue("https://" + e.target.value)
        else
            setSpotifyLinkvalue(e.target.value)
    }
    const handleSaveSpotifyLink = async () => {
        if (SpotifyLinkvalue.startsWith("https://spotify.com") ||
            SpotifyLinkvalue.startsWith("https://Spotify.com") ||
            SpotifyLinkvalue.startsWith("https://spotify.com/") ||
            SpotifyLinkvalue.startsWith("https://Spotify.com/") ||
            SpotifyLinkvalue.startsWith("https://www.spotify.com") ||
            SpotifyLinkvalue.startsWith("https://www.Spotify.com") ||
            SpotifyLinkvalue.startsWith("https://www.spotify.com/") ||
            SpotifyLinkvalue.startsWith("https://www.Spotify.com/") ||
            SpotifyLinkvalue.startsWith("https://open.spotify.com") ||
            SpotifyLinkvalue.startsWith("https://open.Spotify.com") ||
            SpotifyLinkvalue.startsWith("https://open.spotify.com/") ||
            SpotifyLinkvalue.startsWith("https://open.Spotify.com/")
        ) {
            setSpotifyWarnMess(false);

            const newSocialLink = {
                icon: "/spotify.png",
                linkName: "Spotify",
                userName: SpotifyLinkeLable,
                link: SpotifyLinkvalue
            }
            const updatedSL = [...UserSocialLinks, newSocialLink]
            const res = await axios.patch(`http://localhost:3002/users/1`, { SocialLinks: updatedSL });
            setUserSocialLinks(updatedSL);
            setOpenSpotifyLink(false);
            setSpotifyLinkeLable('');
            setSpotifyLinkvalue('');

        }
        else
            setSpotifyWarnMess(true);
    }

    const handleDiscordLinkValue = (e) => {
        if (DiscordLinkvalue.length === 0 && !(e.target.value.includes('https://')))
            setDiscordLinkvalue("https://" + e.target.value)
        else
            setDiscordLinkvalue(e.target.value)
    }
    const handleSaveDiscordLink = async () => {
        if (DiscordLinkvalue.startsWith("https://Discord.com") ||
            DiscordLinkvalue.startsWith("https://discord.com") ||
            DiscordLinkvalue.startsWith("https://Discord.com/") ||
            DiscordLinkvalue.startsWith("https://discord.com/") ||
            DiscordLinkvalue.startsWith("https://www.discord.com") ||
            DiscordLinkvalue.startsWith("https://www.Discord.com") ||
            DiscordLinkvalue.startsWith("https://www.discord.com/") ||
            DiscordLinkvalue.startsWith("https://www.Discord.com/")) {
            setDiscordWarnMess(false);

            const newSocialLink = {
                icon: "/discord.png",
                linkName: "Discord",
                userName: DiscordLinkeLable,
                link: DiscordLinkvalue
            }
            const updatedSL = [...UserSocialLinks, newSocialLink]
            const res = await axios.patch(`http://localhost:3002/users/1`, { SocialLinks: updatedSL });
            setUserSocialLinks(updatedSL);
            setOpenDiscordLink(false);
            setDiscordLinkeLable('');
            setDiscordLinkvalue('');

        }
        else
            setDiscordWarnMess(true);
    }

    const handleSaveSelected = async () => {
        try {
            const newSocialLink = {
                icon: ButtonsWithoutCustomLink[SelectedButton].icon,
                linkName: ButtonsWithoutCustomLink[SelectedButton].linkName,
                userName: UserNameValue,
                link: ButtonsWithoutCustomLink[SelectedButton].link
            }
            const updatedSL = [...UserSocialLinks, newSocialLink]
            const res = await axios.patch(`http://localhost:3002/users/1`, { SocialLinks: updatedSL });
            setUserSocialLinks(updatedSL);
            setOpenMapped(false);
            setUserNameValue('');
        } catch (ex) {
            console.error(ex);
            if (ex.issues != null && ex.issues.length != 0) {
                toast.error(ex.issues[0].message);
            }
        }
    }

    const handleSubstackLinkValue = (e) => {
        if (SubstackLinkvalue.length === 0 && !(e.target.value.includes('https://')))
            setSubstackLinkvalue("https://" + e.target.value)
        else
            setSubstackLinkvalue(e.target.value)
    }
    const handleSaveSubstackLink = async () => {
        if (SubstackLinkvalue.startsWith("https://substack.com") ||
            SubstackLinkvalue.startsWith("https://Substack.com") ||
            SubstackLinkvalue.startsWith("https://substack.com/") ||
            SubstackLinkvalue.startsWith("https://Substack.com/") ||
            SubstackLinkvalue.startsWith("https://www.substack.com") ||
            SubstackLinkvalue.startsWith("https://www.Substack.com") ||
            SubstackLinkvalue.startsWith("https://www.substack.com/") ||
            SubstackLinkvalue.startsWith("https://www.Substack.com/")) {
            setSubstackWarnMess(false);

            const newSocialLink = {
                icon: "/substack.png",
                linkName: "Substack",
                userName: SubstackLinkeLable,
                link: SubstackLinkvalue
            }
            const updatedSL = [...UserSocialLinks, newSocialLink]
            const res = await axios.patch(`http://localhost:3002/users/1`, { SocialLinks: updatedSL });
            setUserSocialLinks(updatedSL);
            setOpenSubstackLink(false);
            setSubstackLinkvalue('');
            setSubstackLinkeLable('');
        }
        else
            setSubstackWarnMess(true);
    }


    const handlekickstarterLinkValue = (e) => {
        if (kickstarterLinkvalue.length === 0 && !(e.target.value.includes('https://')))
            setkickstarterLinkvalue("https://" + e.target.value)
        else
            setkickstarterLinkvalue(e.target.value)
    }
    const handleSavekickstarterLink = async () => {
        if (kickstarterLinkvalue.startsWith("https://kickstarter.com") ||
            kickstarterLinkvalue.startsWith("https://Kickstarter.com") ||
            kickstarterLinkvalue.startsWith("https://kickstarter.com/") ||
            kickstarterLinkvalue.startsWith("https://Kickstarter.com/") ||
            kickstarterLinkvalue.startsWith("https://www.kickstarter.com") ||
            kickstarterLinkvalue.startsWith("https://www.Kickstarter.com") ||
            kickstarterLinkvalue.startsWith("https://www.kickstarter.com/") ||
            kickstarterLinkvalue.startsWith("https://www.Kickstarter.com/")) {
            setkickstarterWarnMess(false);

            const newSocialLink = {
                icon: "/kickstarter.png",
                linkName: " Kickstarter",
                userName: kickstarterLinkeLable,
                link: kickstarterLinkvalue
            }
            const updatedSL = [...UserSocialLinks, newSocialLink]
            const res = await axios.patch(`http://localhost:3002/users/1`, { SocialLinks: updatedSL });
            setUserSocialLinks(updatedSL);
            setOpenkickstarterLink(false);
            setkickstarterLinkeLable('');
            setkickstarterLinkvalue('');

        }
        else
            setkickstarterWarnMess(true);
    }

    const handleShopifyLinkValue = (e) => {
        if (ShopifyLinkvalue.length === 0 && !(e.target.value.includes('https://')))
            setShopifyLinkvalue("https://" + e.target.value)
        else
            setShopifyLinkvalue(e.target.value)
    }
    const handleSaveShopifyLink = async () => {
        if (ShopifyLinkvalue.startsWith("https://shopify.com") ||
            ShopifyLinkvalue.startsWith("https://Shopify.com") ||
            ShopifyLinkvalue.startsWith("https://shopify.com/") ||
            ShopifyLinkvalue.startsWith("https://Shopify.com/") ||
            ShopifyLinkvalue.startsWith("https://www.shopify.com") ||
            ShopifyLinkvalue.startsWith("https://www.Shopify.com") ||
            ShopifyLinkvalue.startsWith("https://www.shopify.com/") ||
            ShopifyLinkvalue.startsWith("https://www.Shopify.com/")) {
            setShopifyWarnMess(false);

            const newSocialLink = {
                icon: "/shopify.png",
                linkName: "Shopify",
                userName: ShopifyLinkeLable,
                link: ShopifyLinkvalue
            }
            const updatedSL = [...UserSocialLinks, newSocialLink]
            const res = await axios.patch(`http://localhost:3002/users/1`, { SocialLinks: updatedSL });
            setUserSocialLinks(updatedSL);
            setOpenShopifyLink(false);
            setShopifyLinkeLable('');
            setShopifyLinkvalue('');

        }
        else
            setShopifyWarnMess(true);
    }

    const handleSaveUserLink = async () => {
        try {
            const updatedSocialLinks = [...UserSocialLinks];
            updatedSocialLinks[SelectedButtonUL] = {
                ...updatedSocialLinks[SelectedButtonUL],
                userName: UserNameUserLink
            };
            const res = await axios.patch(`http://localhost:3002/users/1`, { SocialLinks: updatedSocialLinks });
            setUserSocialLinks(updatedSocialLinks);
            setopenUserLinkPop(false);
        } catch (ex) {
            console.error(ex);
            if (ex.issues != null && ex.issues.length != 0) {
                toast.error(ex.issues[0].message);
            }
        }
    }
    const handleDeleteSL = async (index) => {
        try {
            const updatedSocialLinks = UserSocialLinks.filter((_, i) => i !== index);
            const res = await axios.patch(`http://localhost:3002/users/1`, { SocialLinks: updatedSocialLinks });
            setUserSocialLinks(updatedSocialLinks);
        } catch (ex) {
            console.error(ex);
            if (ex.issues != null && ex.issues.length != 0) {
                toast.error(ex.issues[0].message);
            }
        }
    }

    return (
        <>
            {!(hide) && (

                <div className="flex bg-[rgba(0,0,0,0.59)] place-content-center overflow-y-auto 
                overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full
                 md:inset-0 h-[calc(100%-1rem)]    ">
                    <div className="relative p-4  w-2/3 mx-8  place-content-center justify-center">
                        {/* <!-- Modal content --> */}
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            {/* <!-- Modal header --> */}
                            <div className="flex items-center  p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-xl w-full font-semibold justify-center place-content-center
                                 flex text-gray-900 dark:text-white">
                                    Add Social Link
                                </h3>
                                <button onClick={handleOpenLinkPop} type="button" className="text-gray-400 
                                bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 
                                h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600
                                 dark:hover:text-white">
                                    <X />
                                </button>
                            </div>
                            {/* <!-- Modal body --> */}
                            <div className="flex flex-wrap p-4 md:p-5 border-t border-gray-200 rounded-b
                             dark:border-gray-600">
                                <button role="CustomLinkButton"
                                    onClick={() => { setOpenCustomLink(true); handleOpenLinkPop(true); }}
                                    className='rounded-full border p-4 m-2 bg-gray-200 flex hover:bg-gray-300'>
                                    <img src="/link.png" alt="Link" />
                                    <div className='mx-2 text-xs font-bold'>Custom link </div>
                                </button>
                                <button onClick={() => {
                                    setOpenFoxLink(true); handleOpenLinkPop(true); setFoxLinkWarning(false);
                                }}
                                    className='rounded-full border p-4 m-2 bg-gray-200 flex hover:bg-gray-300'>
                                    <img src="/logo.png" alt="Fox" className='w-4 h-4' />
                                    <div className='mx-2 text-xs font-bold'>Fox </div>
                                </button>
                                <button onClick={() => { setOpenFBLink(true); handleOpenLinkPop(true); }}
                                    className='rounded-full border p-4 m-2 bg-gray-200 flex hover:bg-gray-300'>
                                    <img src="/facebook.png" alt="facebook" className='w-4 h-4' />
                                    <div className='mx-2 text-xs font-bold'>Facebook </div>
                                </button>
                                <button onClick={() => { setOpenyoutubeLink(true); handleOpenLinkPop(true); }}
                                    className='rounded-full border p-4 m-2 bg-gray-200 flex hover:bg-gray-300'>
                                    <img src="/youtube.png" alt="youtube" className='w-4 h-4' />
                                    <div className='mx-2 text-xs font-bold'>Youtube </div>
                                </button>
                                <button onClick={() => { setOpenSpotifyLink(true); handleOpenLinkPop(true); }}
                                    className='rounded-full border p-4 m-2 bg-gray-200 flex hover:bg-gray-300'>
                                    <img src="/spotify.png" alt="spotify" className='w-4 h-4' />
                                    <div className='mx-2 text-xs font-bold'>Spotify </div>
                                </button>
                                <button onClick={() => { setOpenDiscordLink(true); handleOpenLinkPop(true); }}
                                    className='rounded-full border p-4 m-2 bg-gray-200 flex hover:bg-gray-300'>
                                    <img src="/discord.png" alt="discord" className='w-4 h-4' />
                                    <div className='mx-2 text-xs font-bold'>Discord</div>
                                </button>
                                <button onClick={() => { setOpenSubstackLink(true); handleOpenLinkPop(true); }}
                                    className='rounded-full border p-4 m-2 bg-gray-200 flex hover:bg-gray-300'>
                                    <img src="/substack.png" alt="substack" className='w-4 h-4' />
                                    <div className='mx-2 text-xs font-bold'>Substack</div>
                                </button>
                                <button onClick={() => { setOpenkickstarterLink(true); handleOpenLinkPop(true); }}
                                    className='rounded-full border p-4 m-2 bg-gray-200 flex hover:bg-gray-300'>
                                    <img src="/kickstarter.png" alt="kickstarter" className='w-4 h-4' />
                                    <div className='mx-2 text-xs font-bold'>Kickstarter</div>
                                </button>
                                <button onClick={() => { setOpenShopifyLink(true); handleOpenLinkPop(true); }}
                                    className='rounded-full border p-4 m-2 bg-gray-200 flex hover:bg-gray-300'>
                                    <img src="/shopify.png" alt="shopify" className='w-4 h-4' />
                                    <div className='mx-2 text-xs font-bold'>Shopify</div>
                                </button>
                                {ButtonsWithoutCustomLink.map((button, index) =>
                                    <button key={index}
                                        onClick={() => {
                                            setOpenMapped(true); handleOpenLinkPop(true);
                                            setSelectedButton(index);
                                        }}
                                        className='rounded-full border p-4 m-2 bg-gray-200 flex hover:bg-gray-300'>
                                        <img src={button.icon} alt={button.linkName} className='w-4 h-4' />
                                        <div className='mx-2 text-xs font-bold'>{button.linkName}</div>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            )}
            {/* Smaller Popus */}
            {OpenCustomLink && <div className="flex bg-[rgba(0,0,0,0.59)] place-content-center
             overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center 
             items-center w-full md:inset-0 h-[calc(100%-1rem)]    ">
                <div className="relative p-4  w-2/3 mx-8 h-96 place-content-center justify-center">
                    <div className="relative bg-white   rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center  p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <button
                                onClick={() => {
                                    setOpenCustomLink(false);
                                    handleOpenLinkPop(false);;
                                }}
                                className="text-gray-400 bg-transparent hover:bg-gray-200
                                 hover:text-gray-900 rounded-lg text-sm w-8 h-8 dark:hover:bg-gray-600
                                  dark:hover:text-white"
                            >
                                <ArrowLeft />
                            </button>
                            <h3 className="text-xl w-full font-semibold justify-center place-content-center
                             flex text-gray-900 dark:text-white">
                                Add Social Link
                            </h3>

                            <button role='SaveCustomLinkButton'
                                disabled={DisableSaveCL}
                                onClick={handleSaveCustomLink}
                                className="text-black font-bold p-2 w-max bg-gray-300
                                 disabled:text-gray-500 disabled:hover:bg-gray-300 hover:bg-gray-200
                                  hover:text-gray-900 rounded-lg text-sm  h-8 dark:hover:bg-gray-600
                                   dark:hover:text-white"
                            >
                                Save
                            </button>

                        </div>

                        <div className='rounded-full border p-4 mt-2 mx-2 w-max bg-gray-200 flex '>
                            <img src="/link.png" alt="Link" />
                            <div className='mx-2 text-xs font-bold'>Custom link </div>
                        </div>
                        <form className='mb-4  pb-4 px-4'>
                            <br />   <input role="titleInputCustom"
                                type="text" onChange={() => { setCustomLinkeLable(event.target.value) }}
                                placeholder='Display Text' className='border rounded-lg text-sm h-10 p-2 w-[95%] mb-2' />

                            <br />

                            <input role="UrlInputCustom" type="text"
                                className='border rounded-lg text-sm h-10 p-2 w-[95%] mb-2'
                                onChange={handleCustomLinkValue} value={CustomLinkvalue} placeholder='https://website.com' />
                            {CLWarnMess &&
                                <div role="customLinkMess"
                                    className="text-xs text-red-500"><span>URL is not valid</span></div>
                            }

                        </form>
                    </div>
                </div>
            </div>}
            {OpenFoxLink && <div className="flex bg-[rgba(0,0,0,0.59)] place-content-center overflow-y-auto
             overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0
              h-[calc(100%-1rem)]    ">
                <div className="relative p-4  w-2/3 mx-8 h-96 place-content-center justify-center">
                    <div className="relative bg-white   rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center  p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <button
                                onClick={() => {
                                    setOpenFoxLink(false);
                                    handleOpenLinkPop(false);;
                                }}
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900
                                 rounded-lg text-sm w-8 h-8 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                <ArrowLeft />
                            </button>
                            <h3 className="text-xl w-full font-semibold justify-center place-content-center flex
                             text-gray-900 dark:text-white">
                                Add Social Link
                            </h3>
                            <button
                                disabled={DisableSaveFL}
                                onClick={handleSaveFoxLink}
                                className="text-black font-bold p-2 w-max bg-gray-300 disabled:text-gray-500
                                 disabled:hover:bg-gray-300 hover:bg-gray-200 hover:text-gray-900 rounded-lg
                                  text-sm  h-8 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                Save
                            </button>

                        </div>

                        <div
                            className='rounded-full w-max border p-4 m-2 bg-gray-200 flex '>
                            <img src="/logo.png" alt="Fox" className='w-4 h-4' />
                            <div className='mx-2 text-xs font-bold'>Fox </div>
                        </div>
                        <form className='mb-4  pb-4 px-4'>
                            <br /> <input type="text" className='border rounded-lg text-sm h-10 p-2 w-[95%] mb-2'
                                onChange={() => setFoxLinkValue(event.target.value)} value={FoxLinkValue}
                                placeholder='r/community Or u/user' />
                            {FoxLinkWarning &&
                                <div className="text-xs text-red-500"><span>This community or user doesn’t exist.
                                    Double-check your spelling.</span></div>
                            }

                        </form>
                    </div>
                </div>
            </div>}

            {OpenFBLink && <div className="flex bg-[rgba(0,0,0,0.59)] place-content-center overflow-y-auto
             overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 
             h-[calc(100%-1rem)]    ">
                <div className="relative p-4  w-2/3 mx-8 h-96 place-content-center justify-center">
                    {/* <!-- Modal content --> */}
                    <div className="relative bg-white   rounded-lg shadow dark:bg-gray-700">
                        {/* <!-- Modal header --> */}
                        <div className="flex items-center  p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <button
                                onClick={() => {
                                    setOpenFBLink(false);
                                    handleOpenLinkPop(false);;
                                }}
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 
                                rounded-lg text-sm w-8 h-8 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                <ArrowLeft />
                            </button>
                            <h3 className="text-xl w-full font-semibold justify-center place-content-center flex
                             text-gray-900 dark:text-white">
                                Add Social Link
                            </h3>

                            <button
                                disabled={DisableSaveFB}
                                onClick={handleSaveFBLink}
                                className="text-black font-bold p-2 w-max bg-gray-300 disabled:text-gray-500
                                 disabled:hover:bg-gray-300 hover:bg-gray-200 hover:text-gray-900 rounded-lg
                                  text-sm  h-8 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                Save
                            </button>

                        </div>

                        <div className='rounded-full border p-4 mt-2 mx-2 w-max bg-gray-200 flex '>
                            <img src="/facebook.png" alt="facebook" className='w-4 h-4' />
                            <div className='mx-2 text-xs font-bold'>Facebook </div>
                        </div>
                        <form className='mb-4  pb-4 px-4'>
                            <br />   <input type="text" onChange={() => { setFBLinkeLable(event.target.value) }}
                                placeholder='Display Text' className='border rounded-lg text-sm h-10 p-2 w-[95%] mb-2' />
                            <br /> <input type="text" className='border rounded-lg text-sm h-10 p-2 w-[95%] mb-2'
                                onChange={handleFBLinkValue} value={FBLinkvalue} placeholder='https://facebook.com' />
                            {FBWarnMess &&
                                <div className="text-xs text-red-500"><span>URL is not valid</span></div>
                            }

                        </form>
                    </div>
                </div>
            </div>}
            {OpenyoutubeLink && <div className="flex bg-[rgba(0,0,0,0.59)] place-content-center overflow-y-auto
             overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 
             h-[calc(100%-1rem)]    ">
                <div className="relative p-4  w-2/3 mx-8 h-96 place-content-center justify-center">
                    {/* <!-- Modal content --> */}
                    <div className="relative bg-white   rounded-lg shadow dark:bg-gray-700">
                        {/* <!-- Modal header --> */}
                        <div className="flex items-center  p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <button
                                onClick={() => {
                                    setOpenyoutubeLink(false);
                                    handleOpenLinkPop(false);;
                                }}
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900
                                 rounded-lg text-sm w-8 h-8 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                <ArrowLeft />
                            </button>
                            <h3 className="text-xl w-full font-semibold justify-center place-content-center flex
                             text-gray-900 dark:text-white">
                                Add Social Link
                            </h3>

                            <button
                                disabled={DisableSaveyoutube}
                                onClick={handleSaveyoutubeLink}
                                className="text-black font-bold p-2 w-max bg-gray-300 disabled:text-gray-500
                                 disabled:hover:bg-gray-300 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm
                                   h-8 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                Save
                            </button>

                        </div>

                        <div className='rounded-full border p-4 mt-2 mx-2 w-max bg-gray-200 flex '>
                            <img src="/youtube.png" alt="youtube" className='w-4 h-4' />
                            <div className='mx-2 text-xs font-bold'>Youtube </div>
                        </div>
                        <form className='mb-4  pb-4 px-4'>
                            <br />   <input type="text" onChange={() => { setyoutubeLinkeLable(event.target.value) }}
                                placeholder='Display Text' className='border rounded-lg text-sm h-10 p-2 w-[95%] mb-2' />
                            <br /> <input type="text" className='border rounded-lg text-sm h-10 p-2 w-[95%] mb-2'
                                onChange={handleyoutubeLinkValue} value={youtubeLinkvalue} placeholder='https://youtube.com' />
                            {youtubeWarnMess &&
                                <div className="text-xs text-red-500"><span>URL is not valid</span></div>
                            }

                        </form>
                    </div>
                </div>
            </div>}

            {OpenSpotifyLink && <div className="flex bg-[rgba(0,0,0,0.59)] place-content-center overflow-y-auto 
            overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 
            h-[calc(100%-1rem)]    ">
                <div className="relative p-4  w-2/3 mx-8 h-96 place-content-center justify-center">
                    {/* <!-- Modal content --> */}
                    <div className="relative bg-white   rounded-lg shadow dark:bg-gray-700">
                        {/* <!-- Modal header --> */}
                        <div className="flex items-center  p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <button
                                onClick={() => {
                                    setOpenSpotifyLink(false);
                                    handleOpenLinkPop(false);;
                                }}
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 
                                rounded-lg text-sm w-8 h-8 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                <ArrowLeft />
                            </button>
                            <h3 className="text-xl w-full font-semibold justify-center place-content-center flex
                             text-gray-900 dark:text-white">
                                Add Social Link
                            </h3>

                            <button
                                disabled={DisableSaveSpotify}
                                onClick={handleSaveSpotifyLink}
                                className="text-black font-bold p-2 w-max bg-gray-300 disabled:text-gray-500
                                 disabled:hover:bg-gray-300 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm 
                                  h-8 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                Save
                            </button>

                        </div>

                        <div className='rounded-full border p-4 mt-2 mx-2 w-max bg-gray-200 flex '>
                            <img src="/spotify.png" alt="spotify" className='w-4 h-4' />
                            <div className='mx-2 text-xs font-bold'>Spotify </div>
                        </div>
                        <form className='mb-4  pb-4 px-4'>
                            <br />   <input type="text" onChange={() => { setSpotifyLinkeLable(event.target.value) }}
                                placeholder='Display Text' className='border rounded-lg text-sm h-10 p-2 w-[95%] mb-2' />
                            <br /> <input type="text" className='border rounded-lg text-sm h-10 p-2 w-[95%] mb-2'
                                onChange={handleSpotifyLinkValue} value={SpotifyLinkvalue} placeholder='https://Spotify.com' />
                            {SpotifyWarnMess &&
                                <div className="text-xs text-red-500"><span>URL is not valid</span></div>
                            }

                        </form>
                    </div>
                </div>
            </div>}


            {OpenDiscordLink && <div className="flex bg-[rgba(0,0,0,0.59)] place-content-center overflow-y-auto 
            overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 
            h-[calc(100%-1rem)]    ">
                <div className="relative p-4  w-2/3 mx-8 h-96 place-content-center justify-center">
                    {/* <!-- Modal content --> */}
                    <div className="relative bg-white   rounded-lg shadow dark:bg-gray-700">
                        {/* <!-- Modal header --> */}
                        <div className="flex items-center  p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <button
                                onClick={() => {
                                    setOpenDiscordLink(false);
                                    handleOpenLinkPop(false);;
                                }}
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 
                                rounded-lg text-sm w-8 h-8 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                <ArrowLeft />
                            </button>
                            <h3 className="text-xl w-full font-semibold justify-center place-content-center flex
                             text-gray-900 dark:text-white">
                                Add Social Link
                            </h3>

                            <button
                                disabled={DisableSaveDiscord}
                                onClick={handleSaveDiscordLink}
                                className="text-black font-bold p-2 w-max bg-gray-300 disabled:text-gray-500
                                 disabled:hover:bg-gray-300 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm
                                   h-8 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                Save
                            </button>

                        </div>

                        <div className='rounded-full border p-4 mt-2 mx-2 w-max bg-gray-200 flex '>
                            <img src="/discord.png" alt="discord" className='w-4 h-4' />
                            <div className='mx-2 text-xs font-bold'>Discord</div>
                        </div>
                        <form className='mb-4  pb-4 px-4'>
                            <br />   <input type="text" onChange={() => { setDiscordLinkeLable(event.target.value) }}
                                placeholder='Display Text' className='border rounded-lg text-sm h-10 p-2 w-[95%] mb-2' />
                            <br /> <input type="text" className='border rounded-lg text-sm h-10 p-2 w-[95%] mb-2'
                                onChange={handleDiscordLinkValue} value={DiscordLinkvalue} placeholder='https://Discord.com' />
                            {DiscordWarnMess &&
                                <div className="text-xs text-red-500"><span>URL is not valid</span></div>
                            }
                        </form>
                    </div>
                </div>
            </div>}

            {OpenSubstackLink && <div className="flex bg-[rgba(0,0,0,0.59)] place-content-center overflow-y-auto
             overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 
             h-[calc(100%-1rem)]    ">
                <div className="relative p-4  w-2/3 mx-8 h-96 place-content-center justify-center">
                    <div className="relative bg-white   rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center  p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <button
                                onClick={() => {
                                    setOpenSubstackLink(false);
                                    handleOpenLinkPop(false);;
                                }}
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 
                                rounded-lg text-sm w-8 h-8 dark:hover:bg-gray-600 dark:hover:text-white">
                                <ArrowLeft />
                            </button>
                            <h3 className="text-xl w-full font-semibold justify-center place-content-center flex
                             text-gray-900 dark:text-white">
                                Add Social Link
                            </h3>

                            <button
                                disabled={DisableSaveSubstack}
                                onClick={handleSaveSubstackLink}
                                className="text-black font-bold p-2 w-max bg-gray-300 disabled:text-gray-500
                                 disabled:hover:bg-gray-300 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm
                                   h-8 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                Save
                            </button>

                        </div>

                        <div className='rounded-full border p-4 mt-2 mx-2 w-max bg-gray-200 flex '>
                            <img src="/substack.png" alt="Substack" className='w-4 h-4' />
                            <div className='mx-2 text-xs font-bold'>Substack </div>
                        </div>
                        <form className='mb-4  pb-4 px-4'>
                            <br />   <input type="text" onChange={() => { setSubstackLinkeLable(event.target.value) }}
                                placeholder='Display Text' className='border rounded-lg text-sm h-10 p-2 w-[95%] mb-2' />
                            <br /> <input type="text" className='border rounded-lg text-sm h-10 p-2 w-[95%] mb-2'
                                onChange={handleSubstackLinkValue} value={SubstackLinkvalue}
                                placeholder='https://Substack.com' />
                            {SubstackWarnMess &&
                                <div className="text-xs text-red-500"><span>URL is not valid</span></div>
                            }

                        </form>
                    </div>
                </div>
            </div>}
            {OpenkickstarterLink && <div className="flex bg-[rgba(0,0,0,0.59)] place-content-center overflow-y-auto
             overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0
              h-[calc(100%-1rem)]    ">
                <div className="relative p-4  w-2/3 mx-8 h-96 place-content-center justify-center">
                    <div className="relative bg-white   rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center  p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <button
                                onClick={() => {
                                    setOpenkickstarterLink(false);
                                    handleOpenLinkPop(false);;
                                }}
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 
                                rounded-lg text-sm w-8 h-8 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                <ArrowLeft />
                            </button>
                            <h3 className="text-xl w-full font-semibold justify-center place-content-center flex
                             text-gray-900 dark:text-white">
                                Add Social Link
                            </h3>

                            <button
                                disabled={DisableSavekickstarter}
                                onClick={handleSavekickstarterLink}
                                className="text-black font-bold p-2 w-max bg-gray-300 disabled:text-gray-500
                                 disabled:hover:bg-gray-300 hover:bg-gray-200 hover:text-gray-900 rounded-lg 
                                 text-sm  h-8 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                Save
                            </button>

                        </div>

                        <div className='rounded-full border p-4 mt-2 mx-2 w-max bg-gray-200 flex '>
                            <img src="/kickstarter.png" alt="kickstarter" className='w-4 h-4' />
                            <div className='mx-2 text-xs font-bold'>Kickstarter</div>
                        </div>
                        <form className='mb-4  pb-4 px-4'>
                            <br />   <input type="text" onChange={() => { setkickstarterLinkeLable(event.target.value) }}
                                placeholder='Display Text' className='border rounded-lg text-sm h-10 p-2 w-[95%] mb-2' />
                            <br /> <input type="text" className='border rounded-lg text-sm h-10 p-2 w-[95%] mb-2'
                                onChange={handlekickstarterLinkValue} value={kickstarterLinkvalue}
                                placeholder='https://kickstarter.com' />
                            {kickstarterWarnMess &&
                                <div className="text-xs text-red-500"><span>URL is not valid</span></div>
                            }

                        </form>
                    </div>
                </div>
            </div>}

            {OpenShopifyLink && <div className="flex bg-[rgba(0,0,0,0.59)] place-content-center overflow-y-auto 
            overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 
            h-[calc(100%-1rem)]    ">
                <div className="relative p-4  w-2/3 mx-8 h-96 place-content-center justify-center">
                    <div className="relative bg-white   rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center  p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <button
                                onClick={() => {
                                    setOpenShopifyLink(false);
                                    handleOpenLinkPop(false);;
                                }}
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 
                                rounded-lg text-sm w-8 h-8 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                <ArrowLeft />
                            </button>
                            <h3 className="text-xl w-full font-semibold justify-center place-content-center flex
                             text-gray-900 dark:text-white">
                                Add Social Link
                            </h3>

                            <button
                                disabled={DisableSaveShopify}
                                onClick={handleSaveShopifyLink}
                                className="text-black font-bold p-2 w-max bg-gray-300 disabled:text-gray-500
                                 disabled:hover:bg-gray-300 hover:bg-gray-200 hover:text-gray-900 rounded-lg 
                                 text-sm  h-8 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                Save
                            </button>

                        </div>

                        <div className='rounded-full border p-4 mt-2 mx-2 w-max bg-gray-200 flex '>
                            <img src="/shopify.png" alt="shopify" className='w-4 h-4' />
                            <div className='mx-2 text-xs font-bold'>Shopify</div>
                        </div>
                        <form className='mb-4  pb-4 px-4'>
                            <br />   <input type="text" onChange={() => { setShopifyLinkeLable(event.target.value) }}
                                placeholder='Display Text' className='border rounded-lg text-sm h-10 p-2 w-[95%] mb-2' />
                            <br /> <input type="text" className='border rounded-lg text-sm h-10 p-2 w-[95%] mb-2'
                                onChange={handleShopifyLinkValue} value={ShopifyLinkvalue} placeholder='https://Shopify.com' />
                            {ShopifyWarnMess &&
                                <div className="text-xs text-red-500"><span>URL is not valid</span></div>
                            }

                        </form>
                    </div>
                </div>
            </div>}
            {OpenMapped && <div className="flex bg-[rgba(0,0,0,0.59)] place-content-center 
            overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center 
            w-full md:inset-0 h-[calc(100%-1rem)]    ">
                <div className="relative p-4  w-2/3 mx-8 h-96 place-content-center justify-center">
                    <div className="relative bg-white   rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center  p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <button
                                onClick={() => {
                                    setOpenMapped(false);
                                    handleOpenLinkPop(false);
                                }}
                                className="text-gray-400 bg-transparent hover:bg-gray-200
                                 hover:text-gray-900 rounded-lg text-sm w-8 h-8 dark:hover:bg-gray-600
                                  dark:hover:text-white"
                            >
                                <ArrowLeft />
                            </button>
                            <h3 className="text-xl w-full font-semibold justify-center place-content-center 
                            flex text-gray-900 dark:text-white">
                                Add Social Link
                            </h3>
                            <button
                                disabled={DisableSaveSelected}
                                onClick={handleSaveSelected}
                                className="text-black font-bold p-2 w-max bg-gray-300 disabled:text-gray-500
                                 disabled:hover:bg-gray-300 hover:bg-gray-200 hover:text-gray-900 rounded-lg
                                  text-sm  h-8 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                Save
                            </button>

                        </div>

                        <div
                            className='rounded-full w-max border p-4 m-2 bg-gray-200 flex '>
                            <img src={ButtonsWithoutCustomLink[SelectedButton].icon}
                                alt={ButtonsWithoutCustomLink[SelectedButton].linkName} className='w-4 h-4' />
                            <div className='mx-2 text-xs font-bold'>
                                {ButtonsWithoutCustomLink[SelectedButton].linkName}</div>
                        </div>
                        <form className='mb-4  pb-4 px-4'>
                            <br /> <input type="text" value={UserNameValue}
                                className='border rounded-lg text-sm h-10 p-2 w-[95%] mb-2'
                                onChange={() => { setUserNameValue(event.target.value) }} placeholder='@userName' />
                        </form>
                    </div>
                </div>
            </div>}
            <div className='flex flex-wrap m-1'>
                {UserSocialLinks.map((button, index) =>
                    <div key={index} className='flex m-2'>
                        <button onClick={() => {
                            setopenUserLinkPop(true); setSelectedButtonUL(index);
                            setUserNameUserLink(button.userName)
                        }}
                            className='rounded-full border h-fit p-2 bg-gray-200 flex hover:bg-gray-300'>
                            <img src={button.icon} alt={button.linkName} className='w-4 h-4' />
                            <div className='mx-2 text-xs font-bold min-w-max'>{button.userName}</div>
                        </button>
                        <X strokeWidth={1} size={15} onClick={() => { handleDeleteSL(index) }}
                            className='rounded-full hover:bg-gray-300 cursor-pointer my-2' />
                    </div>
                )}
            </div>
            {openUserLinkPop && <div className="flex bg-[rgba(0,0,0,0.59)] place-content-center 
            overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center 
            w-full md:inset-0 h-[calc(100%-1rem)]    ">
                <div className="relative p-4  w-2/3 mx-8 h-96 place-content-center justify-center">
                    <div className="relative bg-white   rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center  p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <button
                                onClick={() => {
                                    setopenUserLinkPop(false);
                                }}
                                className="text-gray-400 bg-transparent hover:bg-gray-200
                                 hover:text-gray-900 rounded-lg text-sm w-8 h-8 dark:hover:bg-gray-600
                                  dark:hover:text-white"
                            >
                                <ArrowLeft />
                            </button>
                            <h3 className="text-xl w-full font-semibold justify-center place-content-center 
                            flex text-gray-900 dark:text-white">
                                Add Social Link
                            </h3>
                            <button
                                disabled={DisableSaveUserLink}
                                onClick={handleSaveUserLink}
                                className="text-black font-bold p-2 w-max bg-gray-300 disabled:text-gray-500
                                 disabled:hover:bg-gray-300 hover:bg-gray-200 hover:text-gray-900 rounded-lg
                                  text-sm  h-8 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                Save
                            </button>
                        </div>
                        <div
                            className='rounded-full w-max border p-4 m-2 bg-gray-200 flex '>
                            <img src={UserSocialLinks[SelectedButtonUL].icon}
                                alt={UserSocialLinks[SelectedButtonUL].linkName} className='w-4 h-4' />
                            <div className='mx-2 text-xs font-bold'>
                                {UserSocialLinks[SelectedButtonUL].linkName}</div>
                        </div>
                        <form className='mb-4  pb-4 px-4'>
                            <br /> <input type="text" value={UserNameUserLink}
                                className='border rounded-lg text-sm h-10 p-2 w-[95%] mb-2'
                                onChange={() => { setUserNameUserLink(event.target.value) }} placeholder='@userName' />
                        </form>
                    </div>
                </div>
            </div>}
        </>

    )
}

export default SocialLinks