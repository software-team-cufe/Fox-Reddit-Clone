
import { useState, useEffect } from 'react'
import { X, ArrowLeft } from "lucide-react";




function SocialLinks({ handleOpenLinkPop }) {
    const [hide, sethide] = useState(false);

    const [OpenCustomLink, setOpenCustomLink] = useState(false);
    const [CustomLinkeLable, setCustomLinkeLable] = useState("");
    const [CustomLinkvalue, setCustomLinkvalue] = useState("");
    const [DisableSaveCL, setDisableSaveCL] = useState(true);
    const [CLWarnMess, setCLWarnMess] = useState(false);

    const [OpenFoxLink, setOpenFoxLink] = useState(false);
    const [FoxLinkWarning, setFoxLinkWarning] = useState(false);
    const [FoxLinkValue, setFoxLinkValue] = useState("");
    const [DisableSaveFL, setDisableSaveFL] = useState(true);

    const [OpenInstaLink, setOpenInstaLink] = useState(false);
    const [InstaLinkValue, setInstaLinkValue] = useState("");
    const [DisableSaveInsta, setDisableSaveInsta] = useState(true);

    const [OpenTwitLink, setOpenTwitLink] = useState(false);
    const [TwitLinkValue, setTwitLinkValue] = useState("");
    const [DisableSaveTwit, setDisableSaveTwit] = useState(true);

    const [OpenTikLink, setOpenTikLink] = useState(false);
    const [TikLinkValue, setTikLinkValue] = useState("");
    const [DisableSaveTik, setDisableSaveTik] = useState(true);

    const [OpenTwitchLink, setOpenTwitchLink] = useState(false);
    const [TwitchLinkValue, setTwitchLinkValue] = useState("");
    const [DisableSaveTwitch, setDisableSaveTwitch] = useState(true);

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

    const [OpenTumblrLink, setOpenTumblrLink] = useState(false);
    const [TumblrLinkValue, setTumblrLinkValue] = useState("");
    const [DisableSaveTumblr, setDisableSaveTumblr] = useState(true);

    const [OpenSpotifyLink, setOpenSpotifyLink] = useState(false);
    const [SpotifyLinkeLable, setSpotifyLinkeLable] = useState("");
    const [SpotifyLinkvalue, setSpotifyLinkvalue] = useState("");
    const [DisableSaveSpotify, setDisableSaveSpotify] = useState(true);
    const [SpotifyWarnMess, setSpotifyWarnMess] = useState(false);

    const [OpenSoundCouldLink, setOpenSoundCouldLink] = useState(false);
    const [SoundCouldLinkValue, setSoundCouldLinkValue] = useState("");
    const [DisableSaveSoundCould, setDisableSaveSoundCould] = useState(true);

    const [OpenBeaconsLink, setOpenBeaconsLink] = useState(false);
    const [BeaconsLinkValue, setBeaconsLinkValue] = useState("");
    const [DisableSaveBeacons, setDisableSaveBeacons] = useState(true);

    const [OpenLinktreeLink, setOpenLinktreeLink] = useState(false);
    const [LinktreeLinkValue, setLinktreeLinkValue] = useState("");
    const [DisableSaveLinktree, setDisableSaveLinktree] = useState(true);

    const [OpenDiscordLink, setOpenDiscordLink] = useState(false);
    const [DiscordLinkeLable, setDiscordLinkeLable] = useState("");
    const [DiscordLinkvalue, setDiscordLinkvalue] = useState("");
    const [DisableSaveDiscord, setDisableSaveDiscord] = useState(true);
    const [DiscordWarnMess, setDiscordWarnMess] = useState(false);

    const [OpenVenmoLink, setOpenVenmoLink] = useState(false);
    const [VenmoLinkValue, setVenmoLinkValue] = useState("");
    const [DisableSaveVenmo, setDisableSaveVenmo] = useState(true);

    const [OpenCashAppLink, setOpenCashAppLink] = useState(false);
    const [CashAppLinkValue, setCashAppLinkValue] = useState("");
    const [DisableSaveCashApp, setDisableSaveCashApp] = useState(true);

    const [OpenPatreonLink, setOpenPatreonLink] = useState(false);
    const [PatreonLinkValue, setPatreonLinkValue] = useState("");
    const [DisableSavePatreon, setDisableSavePatreon] = useState(true);

    const [OpenKofiLink, setOpenKofiLink] = useState(false);
    const [KofiLinkValue, setKofiLinkValue] = useState("");
    const [DisableSaveKofi, setDisableSaveKofi] = useState(true);

    const [OpenPaypalLink, setOpenPaypalLink] = useState(false);
    const [PaypalLinkValue, setPaypalLinkValue] = useState("");
    const [DisableSavePaypal, setDisableSavePaypal] = useState(true);

    const [OpenCameoLink, setOpenCameoLink] = useState(false);
    const [CameoLinkValue, setCameoLinkValue] = useState("");
    const [DisableSaveCameo, setDisableSaveCameo] = useState(true);

    const [OpenOnlyFansLink, setOpenOnlyFansLink] = useState(false);
    const [OnlyFansLinkValue, setOnlyFansLinkValue] = useState("");
    const [DisableSaveOnlyFans, setDisableSaveOnlyFans] = useState(true);

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

    const [OpenBuyCoffLink, setOpenBuyCoffLink] = useState(false);
    const [BuyCoffLinkValue, setBuyCoffLinkValue] = useState("");
    const [DisableSaveBuyCoff, setDisableSaveBuyCoff] = useState(true);

    const [OpenShopifyLink, setOpenShopifyLink] = useState(false);
    const [ShopifyLinkeLable, setShopifyLinkeLable] = useState("");
    const [ShopifyLinkvalue, setShopifyLinkvalue] = useState("");
    const [DisableSaveShopify, setDisableSaveShopify] = useState(true);
    const [ShopifyWarnMess, setShopifyWarnMess] = useState(false);


    //handle Custom link
    useEffect(() => {
        if (CustomLinkvalue.length !== 0 && CustomLinkeLable.length !== 0) {
            setDisableSaveCL(false);
        } else {
            setDisableSaveCL(true);
        }
    }, [CustomLinkvalue, CustomLinkeLable]);
    const handleCustomLinkValue = (e) => {
        if (CustomLinkvalue.length === 0 && !(e.target.value.includes('https://')))
            setCustomLinkvalue("https://" + e.target.value)
        else
            setCustomLinkvalue(e.target.value)
    }
    const handleSaveCustomLink = () => {//To do
        if (!(CustomLinkvalue.startsWith("https://") && CustomLinkvalue.includes("."))) {
            setCLWarnMess(true);

        }
        else
            setCLWarnMess(false);
    }

    //handl Fox link
    const handleSaveFoxLink = () => {//to do
        if (FoxLinkValue.startsWith("r/") || FoxLinkValue.startsWith("u/")) {
            setDisableSaveFL(false);
            setFoxLinkWarning(false);
        }
        else {
            setDisableSaveFL(true);
            setFoxLinkWarning(true);
        }
    }
    useEffect(() => {
        if (FoxLinkValue.length === 0) {
            setDisableSaveFL(true);

        }
        else {
            setDisableSaveFL(false);
        }
    }, [FoxLinkValue])

    //handle Instagram link
    const handleSaveInstaLink = () => {//to do

    }
    const handleInstaLValue = (e) => {
        if (InstaLinkValue.length === 0)
            setInstaLinkValue("@" + e.target.value)
        else
            setInstaLinkValue(e.target.value)
    }
    useEffect(() => {
        if (InstaLinkValue.length === 0) {
            setDisableSaveInsta(true);

        }
        else {
            setDisableSaveInsta(false);
        }
    }, [InstaLinkValue])

    //handle Twitter link
    const handleSaveTwitLink = () => {//to do

    }
    const handleTwitLValue = (e) => {
        if (TwitLinkValue.length === 0)
            setTwitLinkValue("@" + e.target.value)
        else
            setTwitLinkValue(e.target.value)
    }
    useEffect(() => {
        if (TwitLinkValue.length === 0) {
            setDisableSaveTwit(true);

        }
        else {
            setDisableSaveTwit(false);
        }
    }, [TwitLinkValue])

    //handle Tiktok link
    const handleSaveTikLink = () => {//to do

    }
    const handleTikLValue = (e) => {
        if (TikLinkValue.length === 0)
            setTikLinkValue("@" + e.target.value)
        else
            setTikLinkValue(e.target.value)
    }
    useEffect(() => {
        if (TikLinkValue.length === 0) {
            setDisableSaveTik(true);

        }
        else {
            setDisableSaveTik(false);
        }
    }, [TikLinkValue])

    //handle Twitch link
    const handleSaveTwitchLink = () => {//to do
    }
    const handleTwitchLValue = (e) => {
        if (TwitchLinkValue.length === 0)
            setTwitchLinkValue("@" + e.target.value)
        else
            setTwitchLinkValue(e.target.value)
    }
    useEffect(() => {
        if (TwitchLinkValue.length === 0) {
            setDisableSaveTwitch(true);

        }
        else {
            setDisableSaveTwitch(false);
        }
    }, [TwitchLinkValue])

    //handle Facebook link
    useEffect(() => {
        if (FBLinkvalue.length !== 0 && FBLinkeLable.length !== 0) {
            setDisableSaveFB(false);
        } else {
            setDisableSaveFB(true);
        }

    }, [FBLinkvalue, FBLinkeLable]);
    const handleFBLinkValue = (e) => {
        if (FBLinkvalue.length === 0 && !(e.target.value.includes('https://')))
            setFBLinkvalue("https://" + e.target.value)
        else
            setFBLinkvalue(e.target.value)
    }
    const handleSaveFBLink = () => {//To do
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

        }
        else
            setFBWarnMess(true);
    }

    //handle youtube link
    useEffect(() => {
        if (youtubeLinkvalue.length !== 0 && youtubeLinkeLable.length !== 0) {
            setDisableSaveyoutube(false);
        } else {
            setDisableSaveyoutube(true);
        }

    }, [youtubeLinkvalue, youtubeLinkeLable]);
    const handleyoutubeLinkValue = (e) => {
        if (youtubeLinkvalue.length === 0 && !(e.target.value.includes('https://')))
            setyoutubeLinkvalue("https://" + e.target.value)
        else
            setyoutubeLinkvalue(e.target.value)
    }
    const handleSaveyoutubeLink = () => {//To do
        if (youtubeLinkvalue.startsWith("https://youtube.com") ||
            youtubeLinkvalue.startsWith("https://Youtube.com") ||
            youtubeLinkvalue.startsWith("https://youtube.com/") ||
            youtubeLinkvalue.startsWith("https://Youtube.com/") ||
            youtubeLinkvalue.startsWith("https://www.youtube.com") ||
            youtubeLinkvalue.startsWith("https://www.Youtube.com") ||
            youtubeLinkvalue.startsWith("https://www.youtube.com/") ||
            youtubeLinkvalue.startsWith("https://www.Youtube.com/")) {
            setyoutubeWarnMess(false);

        }
        else
            setyoutubeWarnMess(true);
    }

    //handle Tumblr link
    const handleSaveTumblrLink = () => {//to do

    }
    const handleTumblrLValue = (e) => {
        if (TumblrLinkValue.length === 0)
            setTumblrLinkValue("@" + e.target.value)
        else
            setTumblrLinkValue(e.target.value)
    }
    useEffect(() => {
        if (TumblrLinkValue.length === 0) {
            setDisableSaveTumblr(true);

        }
        else {
            setDisableSaveTumblr(false);
        }
    }, [TumblrLinkValue])

    //handle Spotify link
    useEffect(() => {
        if (SpotifyLinkvalue.length !== 0 && SpotifyLinkeLable.length !== 0) {
            setDisableSaveSpotify(false);
        } else {
            setDisableSaveSpotify(true);
        }

    }, [SpotifyLinkvalue, SpotifyLinkeLable]);
    const handleSpotifyLinkValue = (e) => {
        if (SpotifyLinkvalue.length === 0 && !(e.target.value.includes('https://')))
            setSpotifyLinkvalue("https://" + e.target.value)
        else
            setSpotifyLinkvalue(e.target.value)
    }
    const handleSaveSpotifyLink = () => {//To do
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

        }
        else
            setSpotifyWarnMess(true);
    }

    //handle SoundCould link
    const handleSaveSoundCouldLink = () => {//to do

    }
    const handleSoundCouldLValue = (e) => {
        if (SoundCouldLinkValue.length === 0)
            setSoundCouldLinkValue("@" + e.target.value)
        else
            setSoundCouldLinkValue(e.target.value)
    }
    useEffect(() => {
        if (SoundCouldLinkValue.length === 0) {
            setDisableSaveSoundCould(true);

        }
        else {
            setDisableSaveSoundCould(false);
        }
    }, [SoundCouldLinkValue])

    //handle Beacons link
    const handleSaveBeaconsLink = () => {//to do

    }
    const handleBeaconsLValue = (e) => {
        if (BeaconsLinkValue.length === 0)
            setBeaconsLinkValue("@" + e.target.value)
        else
            setBeaconsLinkValue(e.target.value)
    }
    useEffect(() => {
        if (BeaconsLinkValue.length === 0) {
            setDisableSaveBeacons(true);

        }
        else {
            setDisableSaveBeacons(false);
        }
    }, [BeaconsLinkValue])

    //handle Linktree link
    const handleSaveLinktreeLink = () => {//to do

    }
    const handleLinktreeLValue = (e) => {
        if (LinktreeLinkValue.length === 0)
            setLinktreeLinkValue("@" + e.target.value)
        else
            setLinktreeLinkValue(e.target.value)
    }
    useEffect(() => {
        if (LinktreeLinkValue.length === 0) {
            setDisableSaveLinktree(true);

        }
        else {
            setDisableSaveLinktree(false);
        }
    }, [LinktreeLinkValue])

    //handle Discord link
    useEffect(() => {
        if (DiscordLinkvalue.length !== 0 && DiscordLinkeLable.length !== 0) {
            setDisableSaveDiscord(false);
        } else {
            setDisableSaveDiscord(true);
        }

    }, [DiscordLinkvalue, DiscordLinkeLable]);
    const handleDiscordLinkValue = (e) => {
        if (DiscordLinkvalue.length === 0 && !(e.target.value.includes('https://')))
            setDiscordLinkvalue("https://" + e.target.value)
        else
            setDiscordLinkvalue(e.target.value)
    }
    const handleSaveDiscordLink = () => {//To do
        if (DiscordLinkvalue.startsWith("https://Discord.com") ||
            DiscordLinkvalue.startsWith("https://discord.com") ||
            DiscordLinkvalue.startsWith("https://Discord.com/") ||
            DiscordLinkvalue.startsWith("https://discord.com/") ||
            DiscordLinkvalue.startsWith("https://www.discord.com") ||
            DiscordLinkvalue.startsWith("https://www.Discord.com") ||
            DiscordLinkvalue.startsWith("https://www.discord.com/") ||
            DiscordLinkvalue.startsWith("https://www.Discord.com/")) {
            setDiscordWarnMess(false);

        }
        else
            setDiscordWarnMess(true);
    }
    //handle Venmo link
    const handleSaveVenmoLink = () => {//to do

    }
    const handleVenmoLValue = (e) => {
        if (VenmoLinkValue.length === 0)
            setVenmoLinkValue("@" + e.target.value)
        else
            setVenmoLinkValue(e.target.value)
    }
    useEffect(() => {
        if (VenmoLinkValue.length === 0) {
            setDisableSaveVenmo(true);

        }
        else {
            setDisableSaveVenmo(false);
        }
    }, [VenmoLinkValue])

    //handle CashApp link
    const handleSaveCashAppLink = () => {//to do

    }
    const handleCashAppLValue = (e) => {
        if (CashAppLinkValue.length === 0)
            setCashAppLinkValue("@" + e.target.value)
        else
            setCashAppLinkValue(e.target.value)
    }
    useEffect(() => {
        if (CashAppLinkValue.length === 0) {
            setDisableSaveCashApp(true);

        }
        else {
            setDisableSaveCashApp(false);
        }
    }, [CashAppLinkValue])

    //handle Patreon link
    const handleSavePatreonLink = () => {//to do

    }
    const handlePatreonLValue = (e) => {
        if (PatreonLinkValue.length === 0)
            setPatreonLinkValue("@" + e.target.value)
        else
            setPatreonLinkValue(e.target.value)
    }
    useEffect(() => {
        if (PatreonLinkValue.length === 0) {
            setDisableSavePatreon(true);

        }
        else {
            setDisableSavePatreon(false);
        }
    }, [PatreonLinkValue])

    //handle Kofi link
    const handleSaveKofiLink = () => {//to do

    }
    const handleKofiLValue = (e) => {
        if (KofiLinkValue.length === 0)
            setKofiLinkValue("@" + e.target.value)
        else
            setKofiLinkValue(e.target.value)
    }
    useEffect(() => {
        if (KofiLinkValue.length === 0) {
            setDisableSaveKofi(true);

        }
        else {
            setDisableSaveKofi(false);
        }
    }, [KofiLinkValue])

    //handle Paypal link
    const handleSavePaypalLink = () => {//to do

    }
    const handlePaypalLValue = (e) => {
        if (PaypalLinkValue.length === 0)
            setPaypalLinkValue("@" + e.target.value)
        else
            setPaypalLinkValue(e.target.value)
    }
    useEffect(() => {
        if (PaypalLinkValue.length === 0) {
            setDisableSavePaypal(true);

        }
        else {
            setDisableSavePaypal(false);
        }
    }, [PaypalLinkValue])

    //handle Cameo link
    const handleSaveCameoLink = () => {//to do

    }
    const handleCameoLValue = (e) => {
        if (CameoLinkValue.length === 0)
            setCameoLinkValue("@" + e.target.value)
        else
            setCameoLinkValue(e.target.value)
    }
    useEffect(() => {
        if (CameoLinkValue.length === 0) {
            setDisableSaveCameo(true);

        }
        else {
            setDisableSaveCameo(false);
        }
    }, [CameoLinkValue])

    //handle OnlyFans link
    const handleSaveOnlyFansLink = () => {//to do

    }
    const handleOnlyFansLValue = (e) => {
        if (OnlyFansLinkValue.length === 0)
            setOnlyFansLinkValue("@" + e.target.value)
        else
            setOnlyFansLinkValue(e.target.value)
    }
    useEffect(() => {
        if (OnlyFansLinkValue.length === 0) {
            setDisableSaveOnlyFans(true);

        }
        else {
            setDisableSaveOnlyFans(false);
        }
    }, [OnlyFansLinkValue])

    //handle Substack link
    useEffect(() => {
        if (SubstackLinkvalue.length !== 0 && SubstackLinkeLable.length !== 0) {
            setDisableSaveSubstack(false);
        } else {
            setDisableSaveSubstack(true);
        }

    }, [SubstackLinkvalue, SubstackLinkeLable]);
    const handleSubstackLinkValue = (e) => {
        if (SubstackLinkvalue.length === 0 && !(e.target.value.includes('https://')))
            setSubstackLinkvalue("https://" + e.target.value)
        else
            setSubstackLinkvalue(e.target.value)
    }
    const handleSaveSubstackLink = () => {//To do
        if (SubstackLinkvalue.startsWith("https://substack.com") ||
            SubstackLinkvalue.startsWith("https://Substack.com") ||
            SubstackLinkvalue.startsWith("https://substack.com/") ||
            SubstackLinkvalue.startsWith("https://Substack.com/") ||
            SubstackLinkvalue.startsWith("https://www.substack.com") ||
            SubstackLinkvalue.startsWith("https://www.Substack.com") ||
            SubstackLinkvalue.startsWith("https://www.substack.com/") ||
            SubstackLinkvalue.startsWith("https://www.Substack.com/")) {
            setSubstackWarnMess(false);

        }
        else
            setSubstackWarnMess(true);
    }

    //handle kickstarter link
    useEffect(() => {
        if (kickstarterLinkvalue.length !== 0 && kickstarterLinkeLable.length !== 0) {
            setDisableSavekickstarter(false);
        } else {
            setDisableSavekickstarter(true);
        }

    }, [kickstarterLinkvalue, kickstarterLinkeLable]);
    const handlekickstarterLinkValue = (e) => {
        if (kickstarterLinkvalue.length === 0 && !(e.target.value.includes('https://')))
            setkickstarterLinkvalue("https://" + e.target.value)
        else
            setkickstarterLinkvalue(e.target.value)
    }
    const handleSavekickstarterLink = () => {//To do
        if (kickstarterLinkvalue.startsWith("https://kickstarter.com") ||
            kickstarterLinkvalue.startsWith("https://Kickstarter.com") ||
            kickstarterLinkvalue.startsWith("https://kickstarter.com/") ||
            kickstarterLinkvalue.startsWith("https://Kickstarter.com/") ||
            kickstarterLinkvalue.startsWith("https://www.kickstarter.com") ||
            kickstarterLinkvalue.startsWith("https://www.Kickstarter.com") ||
            kickstarterLinkvalue.startsWith("https://www.kickstarter.com/") ||
            kickstarterLinkvalue.startsWith("https://www.Kickstarter.com/")) {
            setkickstarterWarnMess(false);

        }
        else
            setkickstarterWarnMess(true);
    }

    //handle Buy Me a Coffe link
    const handleSaveBuyCoffLink = () => {//to do

    }
    const handleBuyCoffLValue = (e) => {
        if (BuyCoffLinkValue.length === 0)
            setBuyCoffLinkValue("@" + e.target.value)
        else
            setBuyCoffLinkValue(e.target.value)
    }
    useEffect(() => {
        if (BuyCoffLinkValue.length === 0) {
            setDisableSaveBuyCoff(true);

        }
        else {
            setDisableSaveBuyCoff(false);
        }
    }, [BuyCoffLinkValue])

    //handle Shopify link
    useEffect(() => {
        if (ShopifyLinkvalue.length !== 0 && ShopifyLinkeLable.length !== 0) {
            setDisableSaveShopify(false);
        } else {
            setDisableSaveShopify(true);
        }

    }, [ShopifyLinkvalue, ShopifyLinkeLable]);
    const handleShopifyLinkValue = (e) => {
        if (ShopifyLinkvalue.length === 0 && !(e.target.value.includes('https://')))
            setShopifyLinkvalue("https://" + e.target.value)
        else
            setShopifyLinkvalue(e.target.value)
    }
    const handleSaveShopifyLink = () => {//To do
        if (ShopifyLinkvalue.startsWith("https://shopify.com") ||
            ShopifyLinkvalue.startsWith("https://Shopify.com") ||
            ShopifyLinkvalue.startsWith("https://shopify.com/") ||
            ShopifyLinkvalue.startsWith("https://Shopify.com/") ||
            ShopifyLinkvalue.startsWith("https://www.shopify.com") ||
            ShopifyLinkvalue.startsWith("https://www.Shopify.com") ||
            ShopifyLinkvalue.startsWith("https://www.shopify.com/") ||
            ShopifyLinkvalue.startsWith("https://www.Shopify.com/")) {
            setShopifyWarnMess(false);

        }
        else
            setShopifyWarnMess(true);
    }



    return (
        <>
            {!(hide) && (

                <div className="flex bg-[rgba(0,0,0,0.59)] place-content-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)]    ">
                    <div className="relative p-4  w-2/3 mx-8  place-content-center justify-center">
                        {/* <!-- Modal content --> */}
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            {/* <!-- Modal header --> */}
                            <div className="flex items-center  p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-xl w-full font-semibold justify-center place-content-center flex text-gray-900 dark:text-white">
                                    Add Social Link
                                </h3>
                                <button onClick={handleOpenLinkPop} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                                    <X />
                                </button>
                            </div>
                            {/* <!-- Modal body --> */}
                            <div className="flex flex-wrap p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                                <button onClick={() => { setOpenCustomLink(true); sethide(true); }} className='rounded-full border p-4 m-2 bg-gray-200 flex hover:bg-gray-300'>
                                    <img src="./icons/link.png" alt="Link" />
                                    <div className='mx-2 text-xs font-bold'>Custom link </div>
                                </button>
                                <button onClick={() => { setOpenFoxLink(true); sethide(true); }}
                                    className='rounded-full border p-4 m-2 bg-gray-200 flex hover:bg-gray-300'>
                                    <img src="./logo.png" alt="Fox" className='w-4 h-4' />
                                    <div className='mx-2 text-xs font-bold'>Fox </div>
                                </button>
                                <button onClick={() => { setOpenInstaLink(true); sethide(true); }}
                                    className='rounded-full border p-4 m-2 bg-gray-200 flex hover:bg-gray-300'>
                                    <img src="./icons/instagram.png" alt="instagram" className='w-4 h-4' />
                                    <div className='mx-2 text-xs font-bold'>Instagram </div>
                                </button>
                                <button onClick={() => { setOpenTwitLink(true); sethide(true); }}
                                    className='rounded-full border p-4 m-2 bg-gray-200 flex hover:bg-gray-300'>
                                    <img src="./icons/twitter.png" alt="twitter" className='w-4 h-4' />
                                    <div className='mx-2 text-xs font-bold'>Twitter </div>
                                </button>
                                <button onClick={() => { setOpenTikLink(true); sethide(true); }}
                                    className='rounded-full border p-4 m-2 bg-gray-200 flex hover:bg-gray-300'>
                                    <img src="./icons/tiktok.png" alt="tiktok" className='w-4 h-4' />
                                    <div className='mx-2 text-xs font-bold'>Tiktok </div>
                                </button>
                                <button onClick={() => { setOpenTwitchLink(true); sethide(true); }}
                                    className='rounded-full border p-4 m-2 bg-gray-200 flex hover:bg-gray-300'>
                                    <img src="./icons/twitch.png" alt="twitch" className='w-4 h-4' />
                                    <div className='mx-2 text-xs font-bold'>Twitch </div>
                                </button>
                                <button onClick={() => { setOpenFBLink(true); sethide(true); }}
                                    className='rounded-full border p-4 m-2 bg-gray-200 flex hover:bg-gray-300'>
                                    <img src="./icons/facebook.png" alt="facebook" className='w-4 h-4' />
                                    <div className='mx-2 text-xs font-bold'>Facebook </div>
                                </button>
                                <button onClick={() => { setOpenyoutubeLink(true); sethide(true); }}
                                    className='rounded-full border p-4 m-2 bg-gray-200 flex hover:bg-gray-300'>
                                    <img src="./icons/youtube.png" alt="youtube" className='w-4 h-4' />
                                    <div className='mx-2 text-xs font-bold'>Youtube </div>
                                </button>
                                <button onClick={() => { setOpenTumblrLink(true); sethide(true); }}
                                    className='rounded-full border p-4 m-2 bg-gray-200 flex hover:bg-gray-300'>
                                    <img src="./icons/tumblr.png" alt="tumblr" className='w-4 h-4' />
                                    <div className='mx-2 text-xs font-bold'>Tumblr </div>
                                </button>
                                <button onClick={() => { setOpenSpotifyLink(true); sethide(true); }}
                                    className='rounded-full border p-4 m-2 bg-gray-200 flex hover:bg-gray-300'>
                                    <img src="./icons/spotify.png" alt="spotify" className='w-4 h-4' />
                                    <div className='mx-2 text-xs font-bold'>Spotify </div>
                                </button>
                                <button onClick={() => { setOpenSoundCouldLink(true); sethide(true); }}
                                    className='rounded-full border p-4 m-2 bg-gray-200 flex hover:bg-gray-300'>
                                    <img src="./icons/soundcloud.png" alt="soundcloud" className='w-4 h-4' />
                                    <div className='mx-2 text-xs font-bold'>SoundCloud </div>
                                </button>
                                <button onClick={() => { setOpenBeaconsLink(true); sethide(true); }}
                                    className='rounded-full border p-4 m-2 bg-gray-200 flex hover:bg-gray-300'>
                                    <img src="./icons/beacons.png" alt="beacons" className='w-4 h-4' />
                                    <div className='mx-2 text-xs font-bold'>Beacons</div>
                                </button>
                                <button onClick={() => { setOpenLinktreeLink(true); sethide(true); }}
                                    className='rounded-full border p-4 m-2 bg-gray-200 flex hover:bg-gray-300'>
                                    <img src="./icons/linktree.png" alt="linktree" className='w-4 h-4' />
                                    <div className='mx-2 text-xs font-bold'>Linktree</div>
                                </button>
                                <button onClick={() => { setOpenDiscordLink(true); sethide(true); }}
                                    className='rounded-full border p-4 m-2 bg-gray-200 flex hover:bg-gray-300'>
                                    <img src="./icons/discord.png" alt="discord" className='w-4 h-4' />
                                    <div className='mx-2 text-xs font-bold'>Discord</div>
                                </button>
                                <button onClick={() => { setOpenVenmoLink(true); sethide(true); }}
                                    className='rounded-full border p-4 m-2 bg-gray-200 flex hover:bg-gray-300'>
                                    <img src="./icons/venmo.png" alt="venmo" className='w-4 h-4' />
                                    <div className='mx-2 text-xs font-bold'>Venmo</div>
                                </button>
                                <button onClick={() => { setOpenCashAppLink(true); sethide(true); }}
                                    className='rounded-full border p-4 m-2 bg-gray-200 flex hover:bg-gray-300'>
                                    <img src="./icons/cash_app.png" alt="cash_app" className='w-4 h-4' />
                                    <div className='mx-2 text-xs font-bold'>Cash app</div>
                                </button>
                                <button onClick={() => { setOpenPatreonLink(true); sethide(true); }}
                                    className='rounded-full border p-4 m-2 bg-gray-200 flex hover:bg-gray-300'>
                                    <img src="./icons/patreon.png" alt="Patreon" className='w-4 h-4' />
                                    <div className='mx-2 text-xs font-bold'>Patreon</div>
                                </button>
                                <button onClick={() => { setOpenKofiLink(true); sethide(true); }}
                                    className='rounded-full border p-4 m-2 bg-gray-200 flex hover:bg-gray-300'>
                                    <img src="./icons/kofi.png" alt="kofi" className='w-4 h-4' />
                                    <div className='mx-2 text-xs font-bold'>Kofi</div>
                                </button>
                                <button onClick={() => { setOpenPaypalLink(true); sethide(true); }}
                                    className='rounded-full border p-4 m-2 bg-gray-200 flex hover:bg-gray-300'>
                                    <img src="./icons/paypal.png" alt="paypal" className='w-4 h-4' />
                                    <div className='mx-2 text-xs font-bold'>Paypal</div>
                                </button>
                                <button onClick={() => { setOpenCameoLink(true); sethide(true); }}
                                    className='rounded-full border p-4 m-2 bg-gray-200 flex hover:bg-gray-300'>
                                    <img src="./icons/cameo.png" alt="cameo" className='w-4 h-4' />
                                    <div className='mx-2 text-xs font-bold'>Cameo</div>
                                </button>
                                <button onClick={() => { setOpenOnlyFansLink(true); sethide(true); }}
                                    className='rounded-full border p-4 m-2 bg-gray-200 flex hover:bg-gray-300'>
                                    <img src="./icons/onlyfans.png" alt="onlyfans" className='w-4 h-4' />
                                    <div className='mx-2 text-xs font-bold'>OnlyFans</div>
                                </button>
                                <button onClick={() => { setOpenSubstackLink(true); sethide(true); }}
                                    className='rounded-full border p-4 m-2 bg-gray-200 flex hover:bg-gray-300'>
                                    <img src="./icons/substack.png" alt="substack" className='w-4 h-4' />
                                    <div className='mx-2 text-xs font-bold'>Substack</div>
                                </button>
                                <button onClick={() => { setOpenkickstarterLink(true); sethide(true); }}
                                    className='rounded-full border p-4 m-2 bg-gray-200 flex hover:bg-gray-300'>
                                    <img src="./icons/kickstarter.png" alt="kickstarter" className='w-4 h-4' />
                                    <div className='mx-2 text-xs font-bold'>Kickstarter</div>
                                </button>
                                <button onClick={() => { setOpenBuyCoffLink(true); sethide(true); }}
                                    className='rounded-full border p-4 m-2 bg-gray-200 flex hover:bg-gray-300'>
                                    <img src=".\icons\buy_me_a_coffee.png" alt="buy-me-a-coffee" className='w-4 h-4' />
                                    <div className='mx-2 text-xs font-bold'>Buy Me a Coffee</div>
                                </button>
                                <button onClick={() => { setOpenShopifyLink(true); sethide(true); }}
                                    className='rounded-full border p-4 m-2 bg-gray-200 flex hover:bg-gray-300'>
                                    <img src="./icons/shopify.png" alt="shopify" className='w-4 h-4' />
                                    <div className='mx-2 text-xs font-bold'>Shopify</div>
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            )}
            {OpenCustomLink && <div className="flex bg-[rgba(0,0,0,0.59)] place-content-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)]    ">
                <div className="relative p-4  w-2/3 mx-8 h-96 place-content-center justify-center">
                    {/* <!-- Modal content --> */}
                    <div className="relative bg-white   rounded-lg shadow dark:bg-gray-700">
                        {/* <!-- Modal header --> */}
                        <div className="flex items-center  p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <button
                                onClick={() => {
                                    setOpenCustomLink(false);
                                    sethide(false);;
                                }}
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                <ArrowLeft />
                            </button>
                            <h3 className="text-xl w-full font-semibold justify-center place-content-center flex text-gray-900 dark:text-white">
                                Add Social Link
                            </h3>

                            <button
                                disabled={DisableSaveCL}
                                onClick={handleSaveCustomLink}
                                className="text-black font-bold p-2 w-max bg-gray-300 disabled:text-gray-500 disabled:hover:bg-gray-300 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm  h-8 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                Save
                            </button>

                        </div>

                        <div className='rounded-full border p-4 mt-2 mx-2 w-max bg-gray-200 flex '>
                            <img src="./icons/link.png" alt="Link" />
                            <div className='mx-2 text-xs font-bold'>Custom link </div>
                        </div>
                        <form className='mb-4  pb-4 px-4'>
                            <br />   <input type="text" onChange={() => { setCustomLinkeLable(event.target.value) }} placeholder='Display Text' className='border rounded-lg text-sm h-10 p-2 w-[95%] mb-2' />
                            <br /> <input type="text" className='border rounded-lg text-sm h-10 p-2 w-[95%] mb-2' onChange={handleCustomLinkValue} value={CustomLinkvalue} placeholder='https://website.com' />
                            {CLWarnMess &&
                                <div className="text-xs text-red-500"><span>URL is not valid</span></div>
                            }

                        </form>
                    </div>
                </div>
            </div>}
            {OpenFoxLink && <div className="flex bg-[rgba(0,0,0,0.59)] place-content-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)]    ">
                <div className="relative p-4  w-2/3 mx-8 h-96 place-content-center justify-center">
                    {/* <!-- Modal content --> */}
                    <div className="relative bg-white   rounded-lg shadow dark:bg-gray-700">
                        {/* <!-- Modal header --> */}
                        <div className="flex items-center  p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <button
                                onClick={() => {
                                    setOpenFoxLink(false);
                                    sethide(false);;
                                }}
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                <ArrowLeft />
                            </button>
                            <h3 className="text-xl w-full font-semibold justify-center place-content-center flex text-gray-900 dark:text-white">
                                Add Social Link
                            </h3>
                            <button
                                disabled={DisableSaveFL}
                                onClick={handleSaveFoxLink}
                                className="text-black font-bold p-2 w-max bg-gray-300 disabled:text-gray-500 disabled:hover:bg-gray-300 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm  h-8 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                Save
                            </button>

                        </div>

                        <div
                            className='rounded-full w-max border p-4 m-2 bg-gray-200 flex '>
                            <img src="./logo.png" alt="Fox" className='w-4 h-4' />
                            <div className='mx-2 text-xs font-bold'>Fox </div>
                        </div>
                        <form className='mb-4  pb-4 px-4'>
                            <br /> <input type="text" className='border rounded-lg text-sm h-10 p-2 w-[95%] mb-2' onChange={() => setFoxLinkValue(event.target.value)} value={FoxLinkValue} placeholder='r/community Or u/user' />
                            {FoxLinkWarning &&
                                <div className="text-xs text-red-500"><span>This community or user doesn’t exist. Double-check your spelling.</span></div>
                            }

                        </form>
                    </div>
                </div>
            </div>}
            {OpenInstaLink && <div className="flex bg-[rgba(0,0,0,0.59)] place-content-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)]    ">
                <div className="relative p-4  w-2/3 mx-8 h-96 place-content-center justify-center">
                    {/* <!-- Modal content --> */}
                    <div className="relative bg-white   rounded-lg shadow dark:bg-gray-700">
                        {/* <!-- Modal header --> */}
                        <div className="flex items-center  p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <button
                                onClick={() => {
                                    setOpenInstaLink(false);
                                    sethide(false);;
                                }}
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                <ArrowLeft />
                            </button>
                            <h3 className="text-xl w-full font-semibold justify-center place-content-center flex text-gray-900 dark:text-white">
                                Add Social Link
                            </h3>
                            <button
                                disabled={DisableSaveInsta}
                                onClick={handleSaveInstaLink}
                                className="text-black font-bold p-2 w-max bg-gray-300 disabled:text-gray-500 disabled:hover:bg-gray-300 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm  h-8 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                Save
                            </button>

                        </div>

                        <div
                            className='rounded-full w-max border p-4 m-2 bg-gray-200 flex '>
                            <img src="./icons/instagram.png" alt="instagram" className='w-4 h-4' />
                            <div className='mx-2 text-xs font-bold'>Instagram </div>
                        </div>
                        <form className='mb-4  pb-4 px-4'>
                            <br /> <input type="text" className='border rounded-lg text-sm h-10 p-2 w-[95%] mb-2' onChange={handleInstaLValue} value={InstaLinkValue} placeholder='@userName' />

                        </form>
                    </div>
                </div>
            </div>}
            {OpenTwitLink && <div className="flex bg-[rgba(0,0,0,0.59)] place-content-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)]    ">
                <div className="relative p-4  w-2/3 mx-8 h-96 place-content-center justify-center">
                    {/* <!-- Modal content --> */}
                    <div className="relative bg-white   rounded-lg shadow dark:bg-gray-700">
                        {/* <!-- Modal header --> */}
                        <div className="flex items-center  p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <button
                                onClick={() => {
                                    setOpenTwitLink(false);
                                    sethide(false);;
                                }}
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                <ArrowLeft />
                            </button>
                            <h3 className="text-xl w-full font-semibold justify-center place-content-center flex text-gray-900 dark:text-white">
                                Add Social Link
                            </h3>
                            <button
                                disabled={DisableSaveTwit}
                                onClick={handleSaveTwitLink}
                                className="text-black font-bold p-2 w-max bg-gray-300 disabled:text-gray-500 disabled:hover:bg-gray-300 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm  h-8 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                Save
                            </button>

                        </div>

                        <div
                            className='rounded-full w-max border p-4 m-2 bg-gray-200 flex '>
                            <img src="./icons/twitter.png" alt="twitter" className='w-4 h-4' />
                            <div className='mx-2 text-xs font-bold'>Twitter </div>
                        </div>
                        <form className='mb-4  pb-4 px-4'>
                            <br /> <input type="text" className='border rounded-lg text-sm h-10 p-2 w-[95%] mb-2' onChange={handleTwitLValue} value={TwitLinkValue} placeholder='@userName' />

                        </form>
                    </div>
                </div>
            </div>}
            {OpenTikLink && <div className="flex bg-[rgba(0,0,0,0.59)] place-content-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)]    ">
                <div className="relative p-4  w-2/3 mx-8 h-96 place-content-center justify-center">
                    {/* <!-- Modal content --> */}
                    <div className="relative bg-white   rounded-lg shadow dark:bg-gray-700">
                        {/* <!-- Modal header --> */}
                        <div className="flex items-center  p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <button
                                onClick={() => {
                                    setOpenTikLink(false);
                                    sethide(false);;
                                }}
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                <ArrowLeft />
                            </button>
                            <h3 className="text-xl w-full font-semibold justify-center place-content-center flex text-gray-900 dark:text-white">
                                Add Social Link
                            </h3>
                            <button
                                disabled={DisableSaveTik}
                                onClick={handleSaveTikLink}
                                className="text-black font-bold p-2 w-max bg-gray-300 disabled:text-gray-500 disabled:hover:bg-gray-300 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm  h-8 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                Save
                            </button>

                        </div>

                        <div
                            className='rounded-full w-max border p-4 m-2 bg-gray-200 flex '>
                            <img src="./icons/tiktok.png" alt="tiktok" className='w-4 h-4' />
                            <div className='mx-2 text-xs font-bold'>Tiktok </div>
                        </div>
                        <form className='mb-4  pb-4 px-4'>
                            <br /> <input type="text" className='border rounded-lg text-sm h-10 p-2 w-[95%] mb-2' onChange={handleTikLValue} value={TikLinkValue} placeholder='@userName' />

                        </form>
                    </div>
                </div>
            </div>}

            {OpenTwitchLink && <div className="flex bg-[rgba(0,0,0,0.59)] place-content-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)]    ">
                <div className="relative p-4  w-2/3 mx-8 h-96 place-content-center justify-center">
                    {/* <!-- Modal content --> */}
                    <div className="relative bg-white   rounded-lg shadow dark:bg-gray-700">
                        {/* <!-- Modal header --> */}
                        <div className="flex items-center  p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <button
                                onClick={() => {
                                    setOpenTwitchLink(false);
                                    sethide(false);;
                                }}
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                <ArrowLeft />
                            </button>
                            <h3 className="text-xl w-full font-semibold justify-center place-content-center flex text-gray-900 dark:text-white">
                                Add Social Link
                            </h3>
                            <button
                                disabled={DisableSaveTwitch}
                                onClick={handleSaveTwitchLink}
                                className="text-black font-bold p-2 w-max bg-gray-300 disabled:text-gray-500 disabled:hover:bg-gray-300 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm  h-8 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                Save
                            </button>

                        </div>

                        <div
                            className='rounded-full w-max border p-4 m-2 bg-gray-200 flex '>
                            <img src="./icons/twitch.png" alt="twitch" className='w-4 h-4' />
                            <div className='mx-2 text-xs font-bold'>Twitch </div>
                        </div>
                        <form className='mb-4  pb-4 px-4'>
                            <br /> <input type="text" className='border rounded-lg text-sm h-10 p-2 w-[95%] mb-2' onChange={handleTwitchLValue} value={TwitchLinkValue} placeholder='@userName' />

                        </form>
                    </div>
                </div>
            </div>}
            {OpenFBLink && <div className="flex bg-[rgba(0,0,0,0.59)] place-content-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)]    ">
                <div className="relative p-4  w-2/3 mx-8 h-96 place-content-center justify-center">
                    {/* <!-- Modal content --> */}
                    <div className="relative bg-white   rounded-lg shadow dark:bg-gray-700">
                        {/* <!-- Modal header --> */}
                        <div className="flex items-center  p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <button
                                onClick={() => {
                                    setOpenFBLink(false);
                                    sethide(false);;
                                }}
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                <ArrowLeft />
                            </button>
                            <h3 className="text-xl w-full font-semibold justify-center place-content-center flex text-gray-900 dark:text-white">
                                Add Social Link
                            </h3>

                            <button
                                disabled={DisableSaveFB}
                                onClick={handleSaveFBLink}
                                className="text-black font-bold p-2 w-max bg-gray-300 disabled:text-gray-500 disabled:hover:bg-gray-300 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm  h-8 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                Save
                            </button>

                        </div>

                        <div className='rounded-full border p-4 mt-2 mx-2 w-max bg-gray-200 flex '>
                            <img src="./icons/facebook.png" alt="facebook" className='w-4 h-4' />
                            <div className='mx-2 text-xs font-bold'>Facebook </div>
                        </div>
                        <form className='mb-4  pb-4 px-4'>
                            <br />   <input type="text" onChange={() => { setFBLinkeLable(event.target.value) }} placeholder='Display Text' className='border rounded-lg text-sm h-10 p-2 w-[95%] mb-2' />
                            <br /> <input type="text" className='border rounded-lg text-sm h-10 p-2 w-[95%] mb-2' onChange={handleFBLinkValue} value={FBLinkvalue} placeholder='https://facebook.com' />
                            {FBWarnMess &&
                                <div className="text-xs text-red-500"><span>URL is not valid</span></div>
                            }

                        </form>
                    </div>
                </div>
            </div>}
            {OpenyoutubeLink && <div className="flex bg-[rgba(0,0,0,0.59)] place-content-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)]    ">
                <div className="relative p-4  w-2/3 mx-8 h-96 place-content-center justify-center">
                    {/* <!-- Modal content --> */}
                    <div className="relative bg-white   rounded-lg shadow dark:bg-gray-700">
                        {/* <!-- Modal header --> */}
                        <div className="flex items-center  p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <button
                                onClick={() => {
                                    setOpenyoutubeLink(false);
                                    sethide(false);;
                                }}
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                <ArrowLeft />
                            </button>
                            <h3 className="text-xl w-full font-semibold justify-center place-content-center flex text-gray-900 dark:text-white">
                                Add Social Link
                            </h3>

                            <button
                                disabled={DisableSaveyoutube}
                                onClick={handleSaveyoutubeLink}
                                className="text-black font-bold p-2 w-max bg-gray-300 disabled:text-gray-500 disabled:hover:bg-gray-300 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm  h-8 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                Save
                            </button>

                        </div>

                        <div className='rounded-full border p-4 mt-2 mx-2 w-max bg-gray-200 flex '>
                            <img src="./icons/youtube.png" alt="youtube" className='w-4 h-4' />
                            <div className='mx-2 text-xs font-bold'>Youtube </div>
                        </div>
                        <form className='mb-4  pb-4 px-4'>
                            <br />   <input type="text" onChange={() => { setyoutubeLinkeLable(event.target.value) }} placeholder='Display Text' className='border rounded-lg text-sm h-10 p-2 w-[95%] mb-2' />
                            <br /> <input type="text" className='border rounded-lg text-sm h-10 p-2 w-[95%] mb-2' onChange={handleyoutubeLinkValue} value={youtubeLinkvalue} placeholder='https://youtube.com' />
                            {youtubeWarnMess &&
                                <div className="text-xs text-red-500"><span>URL is not valid</span></div>
                            }

                        </form>
                    </div>
                </div>
            </div>}
            {OpenTumblrLink && <div className="flex bg-[rgba(0,0,0,0.59)] place-content-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)]    ">
                <div className="relative p-4  w-2/3 mx-8 h-96 place-content-center justify-center">
                    {/* <!-- Modal content --> */}
                    <div className="relative bg-white   rounded-lg shadow dark:bg-gray-700">
                        {/* <!-- Modal header --> */}
                        <div className="flex items-center  p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <button
                                onClick={() => {
                                    setOpenTumblrLink(false);
                                    sethide(false);;
                                }}
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                <ArrowLeft />
                            </button>
                            <h3 className="text-xl w-full font-semibold justify-center place-content-center flex text-gray-900 dark:text-white">
                                Add Social Link
                            </h3>
                            <button
                                disabled={DisableSaveTumblr}
                                onClick={handleSaveTumblrLink}
                                className="text-black font-bold p-2 w-max bg-gray-300 disabled:text-gray-500 disabled:hover:bg-gray-300 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm  h-8 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                Save
                            </button>

                        </div>

                        <div
                            className='rounded-full w-max border p-4 m-2 bg-gray-200 flex '>
                            <img src="./icons/tumblr.png" alt="tumblr" className='w-4 h-4' />
                            <div className='mx-2 text-xs font-bold'>Tumblr </div>
                        </div>
                        <form className='mb-4  pb-4 px-4'>
                            <br /> <input type="text" className='border rounded-lg text-sm h-10 p-2 w-[95%] mb-2' onChange={handleTumblrLValue} value={TumblrLinkValue} placeholder='@userName' />

                        </form>
                    </div>
                </div>
            </div>}
            {OpenSpotifyLink && <div className="flex bg-[rgba(0,0,0,0.59)] place-content-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)]    ">
                <div className="relative p-4  w-2/3 mx-8 h-96 place-content-center justify-center">
                    {/* <!-- Modal content --> */}
                    <div className="relative bg-white   rounded-lg shadow dark:bg-gray-700">
                        {/* <!-- Modal header --> */}
                        <div className="flex items-center  p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <button
                                onClick={() => {
                                    setOpenSpotifyLink(false);
                                    sethide(false);;
                                }}
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                <ArrowLeft />
                            </button>
                            <h3 className="text-xl w-full font-semibold justify-center place-content-center flex text-gray-900 dark:text-white">
                                Add Social Link
                            </h3>

                            <button
                                disabled={DisableSaveSpotify}
                                onClick={handleSaveSpotifyLink}
                                className="text-black font-bold p-2 w-max bg-gray-300 disabled:text-gray-500 disabled:hover:bg-gray-300 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm  h-8 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                Save
                            </button>

                        </div>

                        <div className='rounded-full border p-4 mt-2 mx-2 w-max bg-gray-200 flex '>
                            <img src="./icons/spotify.png" alt="spotify" className='w-4 h-4' />
                            <div className='mx-2 text-xs font-bold'>Spotify </div>
                        </div>
                        <form className='mb-4  pb-4 px-4'>
                            <br />   <input type="text" onChange={() => { setSpotifyLinkeLable(event.target.value) }} placeholder='Display Text' className='border rounded-lg text-sm h-10 p-2 w-[95%] mb-2' />
                            <br /> <input type="text" className='border rounded-lg text-sm h-10 p-2 w-[95%] mb-2' onChange={handleSpotifyLinkValue} value={SpotifyLinkvalue} placeholder='https://Spotify.com' />
                            {SpotifyWarnMess &&
                                <div className="text-xs text-red-500"><span>URL is not valid</span></div>
                            }

                        </form>
                    </div>
                </div>
            </div>}
            {OpenSoundCouldLink && <div className="flex bg-[rgba(0,0,0,0.59)] place-content-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)]    ">
                <div className="relative p-4  w-2/3 mx-8 h-96 place-content-center justify-center">
                    {/* <!-- Modal content --> */}
                    <div className="relative bg-white   rounded-lg shadow dark:bg-gray-700">
                        {/* <!-- Modal header --> */}
                        <div className="flex items-center  p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <button
                                onClick={() => {
                                    setOpenSoundCouldLink(false);
                                    sethide(false);;
                                }}
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                <ArrowLeft />
                            </button>
                            <h3 className="text-xl w-full font-semibold justify-center place-content-center flex text-gray-900 dark:text-white">
                                Add Social Link
                            </h3>
                            <button
                                disabled={DisableSaveSoundCould}
                                onClick={handleSaveSoundCouldLink}
                                className="text-black font-bold p-2 w-max bg-gray-300 disabled:text-gray-500 disabled:hover:bg-gray-300 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm  h-8 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                Save
                            </button>

                        </div>

                        <div
                            className='rounded-full w-max border p-4 m-2 bg-gray-200 flex '>
                            <img src="./icons/soundcloud.png" alt="soundcloud" className='w-4 h-4' />
                            <div className='mx-2 text-xs font-bold'>SoundCloud </div>
                        </div>
                        <form className='mb-4  pb-4 px-4'>
                            <br /> <input type="text" className='border rounded-lg text-sm h-10 p-2 w-[95%] mb-2' onChange={handleSoundCouldLValue} value={SoundCouldLinkValue} placeholder='@userName' />

                        </form>
                    </div>
                </div>
            </div>}
            {OpenBeaconsLink && <div className="flex bg-[rgba(0,0,0,0.59)] place-content-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)]    ">
                <div className="relative p-4  w-2/3 mx-8 h-96 place-content-center justify-center">
                    {/* <!-- Modal content --> */}
                    <div className="relative bg-white   rounded-lg shadow dark:bg-gray-700">
                        {/* <!-- Modal header --> */}
                        <div className="flex items-center  p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <button
                                onClick={() => {
                                    setOpenBeaconsLink(false);
                                    sethide(false);;
                                }}
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                <ArrowLeft />
                            </button>
                            <h3 className="text-xl w-full font-semibold justify-center place-content-center flex text-gray-900 dark:text-white">
                                Add Social Link
                            </h3>
                            <button
                                disabled={DisableSaveBeacons}
                                onClick={handleSaveBeaconsLink}
                                className="text-black font-bold p-2 w-max bg-gray-300 disabled:text-gray-500 disabled:hover:bg-gray-300 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm  h-8 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                Save
                            </button>

                        </div>

                        <div
                            className='rounded-full w-max border p-4 m-2 bg-gray-200 flex '>
                            <img src="./icons/beacons.png" alt="beacons" className='w-4 h-4' />
                            <div className='mx-2 text-xs font-bold'>Beacons</div>
                        </div>
                        <form className='mb-4  pb-4 px-4'>
                            <br /> <input type="text" className='border rounded-lg text-sm h-10 p-2 w-[95%] mb-2' onChange={handleBeaconsLValue} value={BeaconsLinkValue} placeholder='@userName' />

                        </form>
                    </div>
                </div>
            </div>}
            {OpenLinktreeLink && <div className="flex bg-[rgba(0,0,0,0.59)] place-content-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)]    ">
                <div className="relative p-4  w-2/3 mx-8 h-96 place-content-center justify-center">
                    {/* <!-- Modal content --> */}
                    <div className="relative bg-white   rounded-lg shadow dark:bg-gray-700">
                        {/* <!-- Modal header --> */}
                        <div className="flex items-center  p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <button
                                onClick={() => {
                                    setOpenLinktreeLink(false);
                                    sethide(false);;
                                }}
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                <ArrowLeft />
                            </button>
                            <h3 className="text-xl w-full font-semibold justify-center place-content-center flex text-gray-900 dark:text-white">
                                Add Social Link
                            </h3>
                            <button
                                disabled={DisableSaveLinktree}
                                onClick={handleSaveLinktreeLink}
                                className="text-black font-bold p-2 w-max bg-gray-300 disabled:text-gray-500 disabled:hover:bg-gray-300 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm  h-8 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                Save
                            </button>

                        </div>

                        <div
                            className='rounded-full w-max border p-4 m-2 bg-gray-200 flex '>
                            <img src="./icons/linktree.png" alt="linktree" className='w-4 h-4' />
                            <div className='mx-2 text-xs font-bold'>Linktree</div>
                        </div>
                        <form className='mb-4  pb-4 px-4'>
                            <br /> <input type="text" className='border rounded-lg text-sm h-10 p-2 w-[95%] mb-2' onChange={handleLinktreeLValue} value={LinktreeLinkValue} placeholder='@userName' />

                        </form>
                    </div>
                </div>
            </div>}
            {OpenDiscordLink && <div className="flex bg-[rgba(0,0,0,0.59)] place-content-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)]    ">
                <div className="relative p-4  w-2/3 mx-8 h-96 place-content-center justify-center">
                    {/* <!-- Modal content --> */}
                    <div className="relative bg-white   rounded-lg shadow dark:bg-gray-700">
                        {/* <!-- Modal header --> */}
                        <div className="flex items-center  p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <button
                                onClick={() => {
                                    setOpenDiscordLink(false);
                                    sethide(false);;
                                }}
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                <ArrowLeft />
                            </button>
                            <h3 className="text-xl w-full font-semibold justify-center place-content-center flex text-gray-900 dark:text-white">
                                Add Social Link
                            </h3>

                            <button
                                disabled={DisableSaveDiscord}
                                onClick={handleSaveDiscordLink}
                                className="text-black font-bold p-2 w-max bg-gray-300 disabled:text-gray-500 disabled:hover:bg-gray-300 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm  h-8 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                Save
                            </button>

                        </div>

                        <div className='rounded-full border p-4 mt-2 mx-2 w-max bg-gray-200 flex '>
                            <img src="./icons/discord.png" alt="discord" className='w-4 h-4' />
                            <div className='mx-2 text-xs font-bold'>Discord</div>
                        </div>
                        <form className='mb-4  pb-4 px-4'>
                            <br />   <input type="text" onChange={() => { setDiscordLinkeLable(event.target.value) }} placeholder='Display Text' className='border rounded-lg text-sm h-10 p-2 w-[95%] mb-2' />
                            <br /> <input type="text" className='border rounded-lg text-sm h-10 p-2 w-[95%] mb-2' onChange={handleDiscordLinkValue} value={DiscordLinkvalue} placeholder='https://Discord.com' />
                            {DiscordWarnMess &&
                                <div className="text-xs text-red-500"><span>URL is not valid</span></div>
                            }

                        </form>
                    </div>
                </div>
            </div>}
            {OpenVenmoLink && <div className="flex bg-[rgba(0,0,0,0.59)] place-content-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)]    ">
                <div className="relative p-4  w-2/3 mx-8 h-96 place-content-center justify-center">
                    {/* <!-- Modal content --> */}
                    <div className="relative bg-white   rounded-lg shadow dark:bg-gray-700">
                        {/* <!-- Modal header --> */}
                        <div className="flex items-center  p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <button
                                onClick={() => {
                                    setOpenVenmoLink(false);
                                    sethide(false);;
                                }}
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                <ArrowLeft />
                            </button>
                            <h3 className="text-xl w-full font-semibold justify-center place-content-center flex text-gray-900 dark:text-white">
                                Add Social Link
                            </h3>
                            <button
                                disabled={DisableSaveVenmo}
                                onClick={handleSaveVenmoLink}
                                className="text-black font-bold p-2 w-max bg-gray-300 disabled:text-gray-500 disabled:hover:bg-gray-300 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm  h-8 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                Save
                            </button>

                        </div>

                        <div
                            className='rounded-full w-max border p-4 m-2 bg-gray-200 flex '>
                            <img src="./icons/venmo.png" alt="venmo" className='w-4 h-4' />
                            <div className='mx-2 text-xs font-bold'>Venmo</div>
                        </div>
                        <form className='mb-4  pb-4 px-4'>
                            <br /> <input type="text" className='border rounded-lg text-sm h-10 p-2 w-[95%] mb-2' onChange={handleVenmoLValue} value={VenmoLinkValue} placeholder='@userName' />

                        </form>
                    </div>
                </div>
            </div>}
            {OpenCashAppLink && <div className="flex bg-[rgba(0,0,0,0.59)] place-content-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)]    ">
                <div className="relative p-4  w-2/3 mx-8 h-96 place-content-center justify-center">
                    {/* <!-- Modal content --> */}
                    <div className="relative bg-white   rounded-lg shadow dark:bg-gray-700">
                        {/* <!-- Modal header --> */}
                        <div className="flex items-center  p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <button
                                onClick={() => {
                                    setOpenCashAppLink(false);
                                    sethide(false);;
                                }}
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                <ArrowLeft />
                            </button>
                            <h3 className="text-xl w-full font-semibold justify-center place-content-center flex text-gray-900 dark:text-white">
                                Add Social Link
                            </h3>
                            <button
                                disabled={DisableSaveCashApp}
                                onClick={handleSaveCashAppLink}
                                className="text-black font-bold p-2 w-max bg-gray-300 disabled:text-gray-500 disabled:hover:bg-gray-300 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm  h-8 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                Save
                            </button>

                        </div>

                        <div
                            className='rounded-full w-max border p-4 m-2 bg-gray-200 flex '>
                            <img src="./icons/cash_app.png" alt="cash_app" className='w-4 h-4' />
                            <div className='mx-2 text-xs font-bold'>Cash app</div>
                        </div>
                        <form className='mb-4  pb-4 px-4'>
                            <br /> <input type="text" className='border rounded-lg text-sm h-10 p-2 w-[95%] mb-2' onChange={handleCashAppLValue} value={CashAppLinkValue} placeholder='@userName' />

                        </form>
                    </div>
                </div>
            </div>}
            {OpenPatreonLink && <div className="flex bg-[rgba(0,0,0,0.59)] place-content-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)]    ">
                <div className="relative p-4  w-2/3 mx-8 h-96 place-content-center justify-center">
                    {/* <!-- Modal content --> */}
                    <div className="relative bg-white   rounded-lg shadow dark:bg-gray-700">
                        {/* <!-- Modal header --> */}
                        <div className="flex items-center  p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <button
                                onClick={() => {
                                    setOpenPatreonLink(false);
                                    sethide(false);;
                                }}
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                <ArrowLeft />
                            </button>
                            <h3 className="text-xl w-full font-semibold justify-center place-content-center flex text-gray-900 dark:text-white">
                                Add Social Link
                            </h3>
                            <button
                                disabled={DisableSavePatreon}
                                onClick={handleSavePatreonLink}
                                className="text-black font-bold p-2 w-max bg-gray-300 disabled:text-gray-500 disabled:hover:bg-gray-300 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm  h-8 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                Save
                            </button>

                        </div>

                        <div
                            className='rounded-full w-max border p-4 m-2 bg-gray-200 flex '>
                            <img src="./icons/patreon.png" alt="Patreon" className='w-4 h-4' />
                            <div className='mx-2 text-xs font-bold'>Patreon</div>
                        </div>
                        <form className='mb-4  pb-4 px-4'>
                            <br /> <input type="text" className='border rounded-lg text-sm h-10 p-2 w-[95%] mb-2' onChange={handlePatreonLValue} value={PatreonLinkValue} placeholder='@userName' />

                        </form>
                    </div>
                </div>
            </div>}
            {OpenKofiLink && <div className="flex bg-[rgba(0,0,0,0.59)] place-content-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)]    ">
                <div className="relative p-4  w-2/3 mx-8 h-96 place-content-center justify-center">
                    {/* <!-- Modal content --> */}
                    <div className="relative bg-white   rounded-lg shadow dark:bg-gray-700">
                        {/* <!-- Modal header --> */}
                        <div className="flex items-center  p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <button
                                onClick={() => {
                                    setOpenKofiLink(false);
                                    sethide(false);;
                                }}
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                <ArrowLeft />
                            </button>
                            <h3 className="text-xl w-full font-semibold justify-center place-content-center flex text-gray-900 dark:text-white">
                                Add Social Link
                            </h3>
                            <button
                                disabled={DisableSaveKofi}
                                onClick={handleSaveKofiLink}
                                className="text-black font-bold p-2 w-max bg-gray-300 disabled:text-gray-500 disabled:hover:bg-gray-300 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm  h-8 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                Save
                            </button>

                        </div>

                        <div
                            className='rounded-full w-max border p-4 m-2 bg-gray-200 flex '>
                            <img src="./icons/kofi.png" alt="kofi" className='w-4 h-4' />
                            <div className='mx-2 text-xs font-bold'>Kofi</div>
                        </div>
                        <form className='mb-4  pb-4 px-4'>
                            <br /> <input type="text" className='border rounded-lg text-sm h-10 p-2 w-[95%] mb-2' onChange={handleKofiLValue} value={KofiLinkValue} placeholder='@userName' />

                        </form>
                    </div>
                </div>
            </div>}
            {OpenPaypalLink && <div className="flex bg-[rgba(0,0,0,0.59)] place-content-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)]    ">
                <div className="relative p-4  w-2/3 mx-8 h-96 place-content-center justify-center">
                    {/* <!-- Modal content --> */}
                    <div className="relative bg-white   rounded-lg shadow dark:bg-gray-700">
                        {/* <!-- Modal header --> */}
                        <div className="flex items-center  p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <button
                                onClick={() => {
                                    setOpenPaypalLink(false);
                                    sethide(false);;
                                }}
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                <ArrowLeft />
                            </button>
                            <h3 className="text-xl w-full font-semibold justify-center place-content-center flex text-gray-900 dark:text-white">
                                Add Social Link
                            </h3>
                            <button
                                disabled={DisableSavePaypal}
                                onClick={handleSavePaypalLink}
                                className="text-black font-bold p-2 w-max bg-gray-300 disabled:text-gray-500 disabled:hover:bg-gray-300 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm  h-8 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                Save
                            </button>

                        </div>

                        <div
                            className='rounded-full w-max border p-4 m-2 bg-gray-200 flex '>
                            <img src="./icons/paypal.png" alt="paypal" className='w-4 h-4' />
                            <div className='mx-2 text-xs font-bold'>Paypal</div>
                        </div>
                        <form className='mb-4  pb-4 px-4'>
                            <br /> <input type="text" className='border rounded-lg text-sm h-10 p-2 w-[95%] mb-2' onChange={handlePaypalLValue} value={PaypalLinkValue} placeholder='@userName' />

                        </form>
                    </div>
                </div>
            </div>}
            {OpenCameoLink && <div className="flex bg-[rgba(0,0,0,0.59)] place-content-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)]    ">
                <div className="relative p-4  w-2/3 mx-8 h-96 place-content-center justify-center">
                    {/* <!-- Modal content --> */}
                    <div className="relative bg-white   rounded-lg shadow dark:bg-gray-700">
                        {/* <!-- Modal header --> */}
                        <div className="flex items-center  p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <button
                                onClick={() => {
                                    setOpenCameoLink(false);
                                    sethide(false);;
                                }}
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                <ArrowLeft />
                            </button>
                            <h3 className="text-xl w-full font-semibold justify-center place-content-center flex text-gray-900 dark:text-white">
                                Add Social Link
                            </h3>
                            <button
                                disabled={DisableSaveCameo}
                                onClick={handleSaveCameoLink}
                                className="text-black font-bold p-2 w-max bg-gray-300 disabled:text-gray-500 disabled:hover:bg-gray-300 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm  h-8 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                Save
                            </button>

                        </div>

                        <div
                            className='rounded-full w-max border p-4 m-2 bg-gray-200 flex '>
                            <img src="./icons/cameo.png" alt="cameo" className='w-4 h-4' />
                            <div className='mx-2 text-xs font-bold'>Cameo</div>
                        </div>
                        <form className='mb-4  pb-4 px-4'>
                            <br /> <input type="text" className='border rounded-lg text-sm h-10 p-2 w-[95%] mb-2' onChange={handleCameoLValue} value={CameoLinkValue} placeholder='@userName' />

                        </form>
                    </div>
                </div>
            </div>}
            {OpenOnlyFansLink && <div className="flex bg-[rgba(0,0,0,0.59)] place-content-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)]    ">
                <div className="relative p-4  w-2/3 mx-8 h-96 place-content-center justify-center">
                    {/* <!-- Modal content --> */}
                    <div className="relative bg-white   rounded-lg shadow dark:bg-gray-700">
                        {/* <!-- Modal header --> */}
                        <div className="flex items-center  p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <button
                                onClick={() => {
                                    setOpenOnlyFansLink(false);
                                    sethide(false);;
                                }}
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                <ArrowLeft />
                            </button>
                            <h3 className="text-xl w-full font-semibold justify-center place-content-center flex text-gray-900 dark:text-white">
                                Add Social Link
                            </h3>
                            <button
                                disabled={DisableSaveOnlyFans}
                                onClick={handleSaveOnlyFansLink}
                                className="text-black font-bold p-2 w-max bg-gray-300 disabled:text-gray-500 disabled:hover:bg-gray-300 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm  h-8 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                Save
                            </button>

                        </div>

                        <div
                            className='rounded-full w-max border p-4 m-2 bg-gray-200 flex '>
                            <img src="./icons/onlyfans.png" alt="onlyfans" className='w-4 h-4' />
                            <div className='mx-2 text-xs font-bold'>OnlyFans</div>
                        </div>
                        <form className='mb-4  pb-4 px-4'>
                            <br /> <input type="text" className='border rounded-lg text-sm h-10 p-2 w-[95%] mb-2' onChange={handleOnlyFansLValue} value={OnlyFansLinkValue} placeholder='@userName' />

                        </form>
                    </div>
                </div>
            </div>}
            {OpenSubstackLink && <div className="flex bg-[rgba(0,0,0,0.59)] place-content-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)]    ">
                <div className="relative p-4  w-2/3 mx-8 h-96 place-content-center justify-center">
                    {/* <!-- Modal content --> */}
                    <div className="relative bg-white   rounded-lg shadow dark:bg-gray-700">
                        {/* <!-- Modal header --> */}
                        <div className="flex items-center  p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <button
                                onClick={() => {
                                    setOpenSubstackLink(false);
                                    sethide(false);;
                                }}
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                <ArrowLeft />
                            </button>
                            <h3 className="text-xl w-full font-semibold justify-center place-content-center flex text-gray-900 dark:text-white">
                                Add Social Link
                            </h3>

                            <button
                                disabled={DisableSaveSubstack}
                                onClick={handleSaveSubstackLink}
                                className="text-black font-bold p-2 w-max bg-gray-300 disabled:text-gray-500 disabled:hover:bg-gray-300 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm  h-8 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                Save
                            </button>

                        </div>

                        <div className='rounded-full border p-4 mt-2 mx-2 w-max bg-gray-200 flex '>
                            <img src="./icons/Substack.png" alt="Substack" className='w-4 h-4' />
                            <div className='mx-2 text-xs font-bold'>Substack </div>
                        </div>
                        <form className='mb-4  pb-4 px-4'>
                            <br />   <input type="text" onChange={() => { setSubstackLinkeLable(event.target.value) }} placeholder='Display Text' className='border rounded-lg text-sm h-10 p-2 w-[95%] mb-2' />
                            <br /> <input type="text" className='border rounded-lg text-sm h-10 p-2 w-[95%] mb-2' onChange={handleSubstackLinkValue} value={SubstackLinkvalue} placeholder='https://Substack.com' />
                            {SubstackWarnMess &&
                                <div className="text-xs text-red-500"><span>URL is not valid</span></div>
                            }

                        </form>
                    </div>
                </div>
            </div>}
            {OpenkickstarterLink && <div className="flex bg-[rgba(0,0,0,0.59)] place-content-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)]    ">
                <div className="relative p-4  w-2/3 mx-8 h-96 place-content-center justify-center">
                    {/* <!-- Modal content --> */}
                    <div className="relative bg-white   rounded-lg shadow dark:bg-gray-700">
                        {/* <!-- Modal header --> */}
                        <div className="flex items-center  p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <button
                                onClick={() => {
                                    setOpenkickstarterLink(false);
                                    sethide(false);;
                                }}
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                <ArrowLeft />
                            </button>
                            <h3 className="text-xl w-full font-semibold justify-center place-content-center flex text-gray-900 dark:text-white">
                                Add Social Link
                            </h3>

                            <button
                                disabled={DisableSavekickstarter}
                                onClick={handleSavekickstarterLink}
                                className="text-black font-bold p-2 w-max bg-gray-300 disabled:text-gray-500 disabled:hover:bg-gray-300 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm  h-8 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                Save
                            </button>

                        </div>

                        <div className='rounded-full border p-4 mt-2 mx-2 w-max bg-gray-200 flex '>
                            <img src="./icons/kickstarter.png" alt="kickstarter" className='w-4 h-4' />
                            <div className='mx-2 text-xs font-bold'>Kickstarter</div>
                        </div>
                        <form className='mb-4  pb-4 px-4'>
                            <br />   <input type="text" onChange={() => { setkickstarterLinkeLable(event.target.value) }} placeholder='Display Text' className='border rounded-lg text-sm h-10 p-2 w-[95%] mb-2' />
                            <br /> <input type="text" className='border rounded-lg text-sm h-10 p-2 w-[95%] mb-2' onChange={handlekickstarterLinkValue} value={kickstarterLinkvalue} placeholder='https://kickstarter.com' />
                            {kickstarterWarnMess &&
                                <div className="text-xs text-red-500"><span>URL is not valid</span></div>
                            }

                        </form>
                    </div>
                </div>
            </div>}
            {OpenBuyCoffLink && <div className="flex bg-[rgba(0,0,0,0.59)] place-content-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)]    ">
                <div className="relative p-4  w-2/3 mx-8 h-96 place-content-center justify-center">
                    {/* <!-- Modal content --> */}
                    <div className="relative bg-white   rounded-lg shadow dark:bg-gray-700">
                        {/* <!-- Modal header --> */}
                        <div className="flex items-center  p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <button
                                onClick={() => {
                                    setOpenBuyCoffLink(false);
                                    sethide(false);;
                                }}
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                <ArrowLeft />
                            </button>
                            <h3 className="text-xl w-full font-semibold justify-center place-content-center flex text-gray-900 dark:text-white">
                                Add Social Link
                            </h3>
                            <button
                                disabled={DisableSaveBuyCoff}
                                onClick={handleSaveBuyCoffLink}
                                className="text-black font-bold p-2 w-max bg-gray-300 disabled:text-gray-500 disabled:hover:bg-gray-300 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm  h-8 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                Save
                            </button>

                        </div>

                        <div
                            className='rounded-full w-max border p-4 m-2 bg-gray-200 flex '>
                            <img src=".\icons\buy_me_a_coffee.png" alt="buy-me-a-coffee" className='w-4 h-4' />
                            <div className='mx-2 text-xs font-bold'>Buy Me a Coffee</div>
                        </div>
                        <form className='mb-4  pb-4 px-4'>
                            <br /> <input type="text" className='border rounded-lg text-sm h-10 p-2 w-[95%] mb-2' onChange={handleBuyCoffLValue} value={BuyCoffLinkValue} placeholder='@userName' />

                        </form>
                    </div>
                </div>
            </div>}
            {OpenShopifyLink && <div className="flex bg-[rgba(0,0,0,0.59)] place-content-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)]    ">
                <div className="relative p-4  w-2/3 mx-8 h-96 place-content-center justify-center">
                    {/* <!-- Modal content --> */}
                    <div className="relative bg-white   rounded-lg shadow dark:bg-gray-700">
                        {/* <!-- Modal header --> */}
                        <div className="flex items-center  p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <button
                                onClick={() => {
                                    setOpenShopifyLink(false);
                                    sethide(false);;
                                }}
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                <ArrowLeft />
                            </button>
                            <h3 className="text-xl w-full font-semibold justify-center place-content-center flex text-gray-900 dark:text-white">
                                Add Social Link
                            </h3>

                            <button
                                disabled={DisableSaveShopify}
                                onClick={handleSaveShopifyLink}
                                className="text-black font-bold p-2 w-max bg-gray-300 disabled:text-gray-500 disabled:hover:bg-gray-300 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm  h-8 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                Save
                            </button>

                        </div>

                        <div className='rounded-full border p-4 mt-2 mx-2 w-max bg-gray-200 flex '>
                            <img src="./icons/shopify.png" alt="shopify" className='w-4 h-4' />
                            <div className='mx-2 text-xs font-bold'>Shopify</div>
                        </div>
                        <form className='mb-4  pb-4 px-4'>
                            <br />   <input type="text" onChange={() => { setShopifyLinkeLable(event.target.value) }} placeholder='Display Text' className='border rounded-lg text-sm h-10 p-2 w-[95%] mb-2' />
                            <br /> <input type="text" className='border rounded-lg text-sm h-10 p-2 w-[95%] mb-2' onChange={handleShopifyLinkValue} value={ShopifyLinkvalue} placeholder='https://Shopify.com' />
                            {ShopifyWarnMess &&
                                <div className="text-xs text-red-500"><span>URL is not valid</span></div>
                            }

                        </form>
                    </div>
                </div>
            </div>}

        </>
    )
}

export default SocialLinks