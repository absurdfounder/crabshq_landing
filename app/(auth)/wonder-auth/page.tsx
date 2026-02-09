"use client";

import React, { useState } from "react";
import { X, Wallet, ChevronDown, ArrowLeft, ArrowRight, Mail, Phone, Key, Check, Loader2, AlertCircle, CheckCircle } from "lucide-react";
import Link from "next/link";

type SocialProvider = 'google' | 'discord' | 'telegram' | 'github' | 'twitch' | 'steam' | 'farcaster' | 'line' | 'x' | 'tiktok' | 'facebook' | 'apple';
type WalletType = 'metamask' | 'rainbow' | 'rabby' | 'okx' | 'bagpack' | 'coinbaseWallet' | 'trustWallet' | 'phantom' | 'safepal';

const walletLogos: Record<string, string> = {
    metamask: 'https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg',
    rainbow: 'https://avatars.githubusercontent.com/u/48327834?s=280&v=4',
    rabby: 'https://rabby.io/assets/images/logo-128.png',
    okx: 'https://play-lh.googleusercontent.com/N00SbjLJJrhg4hbdnkk3Llk2oedNNgCU29DvR9cpep7Lr0VkzvBkmLqajWNgFb0d7IOO=w240-h480-rw',
    coinbaseWallet: 'https://raw.githubusercontent.com/gist/taycaldwell/2291907115c0bb5589bc346661435007/raw/280eafdc84cb80ed0c60e36b4d0c563f6dca6b3e/cbw.svg',
    bagpack: 'https://cdn.prod.website-files.com/66830ad123bea7f626bcf58f/67ab351cf66d6cd9bad4340f_Standalone_Icon_Red%20(1).png',
    trustWallet: 'https://trustwallet.com/assets/images/media/assets/TWT.png',
    phantom: 'https://cimg.co/wp-content/uploads/2025/08/19125824/1755608303-phantom-wallet-logo.png',
    safepal: 'https://s2.coinmarketcap.com/static/img/coins/200x200/8119.png',
};

const walletNames: Record<string, string> = {
    metamask: 'MetaMask',
    rainbow: 'Rainbow',
    rabby: 'Rabby',
    okx: 'OKX Wallet',
    coinbaseWallet: 'Coinbase',
    bagpack: 'Bagpack',
    trustWallet: 'Trust Wallet',
    phantom: 'Phantom',
    safepal: 'SafePal',
};

const GoogleIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
);

const FacebookIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2" />
    </svg>
);

const DiscordIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" fill="#5865F2" />
    </svg>
);

const TelegramIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" fill="#0088cc" />
    </svg>
);

const GithubIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
);

const XIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

const AppleIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
);

const FarcasterIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L4 7v10l8 5 8-5V7l-8-5z" />
    </svg>
);

export default function AuthLanding() {
    const [showWallets, setShowWallets] = useState(false);
    const [showBuilder, setShowBuilder] = useState(false);
    const [loading, setLoading] = useState(false);
    const [authError, setAuthError] = useState('');
    const [authSuccess, setAuthSuccess] = useState('');
    const [authStep, setAuthStep] = useState('main');

    const [socialProviders, setSocialProviders] = useState({
        google: true,
        discord: true,
        telegram: false,
        github: false,
        twitch: false,
        steam: false,
        farcaster: false,
        line: false,
        x: false,
        tiktok: false,
        facebook: false,
        apple: false,
    });
    const [showEmail, setShowEmail] = useState(true);
    const [showPhone, setShowPhone] = useState(true);
    const [showPasskey, setShowPasskey] = useState(true);
    const [showWallet, setShowWallet] = useState(true);
    const [showGuestMode, setShowGuestMode] = useState(true);
    const [enableGasless, setEnableGasless] = useState(true);

    const [wallets, setWallets] = useState({
        metamask: true,
        rainbow: true,
        rabby: true,
        okx: true,
        bagpack: true,
        coinbaseWallet: true,
        trustWallet: true,
        phantom: false,
        safepal: false,
    });

    const [activeTab, setActiveTab] = useState('modal');
    const [configExpanded, setConfigExpanded] = useState(true);
    const [previewShowWallets, setPreviewShowWallets] = useState(false);
    const [customLogo, setCustomLogo] = useState('https://dazzling-cat.netlify.app/astralogo.png');

    const toggleSocialProvider = (provider: SocialProvider) => {
        setSocialProviders(prev => {
            const currentEnabled = Object.values(prev).filter(v => v).length;
            const isCurrentlyEnabled = prev[provider];

            // If trying to enable and already at max 2, don't allow
            if (!isCurrentlyEnabled && currentEnabled >= 2) {
                return prev;
            }

            return { ...prev, [provider]: !prev[provider] };
        });
    };

    const getEnabledSocialCount = () => {
        return Object.values(socialProviders).filter(v => v).length;
    };

    const toggleWallet = (wallet: WalletType) => {
        setWallets(prev => ({ ...prev, [wallet]: !prev[wallet] }));
    };

    const getEnabledWallets = () => {
        return Object.entries(wallets)
            .filter(([_, enabled]) => enabled)
            .map(([key]) => key as WalletType);
    };

    const getEnabledSocialProviders = () => {
        return Object.entries(socialProviders)
            .filter(([_, enabled]) => enabled)
            .map(([key]) => key as SocialProvider);
    };

    const getSocialIcon = (provider: SocialProvider) => {
        const icons: Record<SocialProvider, JSX.Element> = {
            google: <GoogleIcon />,
            facebook: <FacebookIcon />,
            discord: <DiscordIcon />,
            telegram: <TelegramIcon />,
            github: <GithubIcon />,
            x: <XIcon />,
            apple: <AppleIcon />,
            farcaster: <FarcasterIcon />,
            twitch: <svg className="w-5 h-5 text-purple-600" viewBox="0 0 24 24" fill="currentColor"><path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z" /></svg>,
            steam: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 1 10 10 10 10 0 0 1-10 10c-4.6 0-8.45-3.08-9.64-7.27l3.83 1.58a2.84 2.84 0 0 0 2.78 2.27c1.56 0 2.83-1.27 2.83-2.83v-.13l3.4-2.43h.08c2.08 0 3.77-1.69 3.77-3.77s-1.69-3.77-3.77-3.77-3.78 1.69-3.78 3.77v.05l-2.37 3.46-.16-.01c-.59 0-1.14.18-1.59.49L2 11.2C2.43 6.05 6.73 2 12 2M8.28 17.17c.8.33 1.72-.04 2.05-.84.33-.8-.05-1.71-.83-2.04l-1.28-.53c.49-.18 1.04-.19 1.56.03.53.21.94.62 1.15 1.15.22.52.22 1.1 0 1.62-.43 1.08-1.7 1.6-2.78 1.15l1.13.46M15.4 9.13c1.44 0 2.61-1.17 2.61-2.61s-1.17-2.61-2.61-2.61-2.61 1.17-2.61 2.61 1.17 2.61 2.61 2.61m-1.86-2.61c0-1.03.84-1.86 1.86-1.86s1.86.83 1.86 1.86-.84 1.87-1.86 1.87-1.86-.84-1.86-1.87z" /></svg>,
            line: <svg className="w-5 h-5 text-green-500" viewBox="0 0 24 24" fill="currentColor"><path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" /></svg>,
            tiktok: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" /></svg>,
        };
        return icons[provider] || null;
    };

    return (
        <div>
            <div
                className="min-h-screen flex flex-col pb-12"
                style={{
                    backgroundImage: "linear-gradient(rgb(255 255 255), rgb(255 255 255 / 70%), rgb(255 255 255 / 48%)), url(https://dazzling-cat.netlify.app/backgroundgreysketch.png)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideUp {
                    from { 
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to { 
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                @keyframes slideDown {
                    from { 
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to { 
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.2s ease-out;
                }
                .animate-slideUp {
                    animation: slideUp 0.3s ease-out;
                }
                .animate-slideDown {
                    animation: slideDown 0.2s ease-out;
                }
            `}</style>

                {/* Navbar */}
                <nav className="bg-white/80 backdrop-blur-md py-3 px-6 mt-4">
                    <div className="max-w-7xl mx-auto flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <img src="https://dazzling-cat.netlify.app/wonderauth.png" className="h-8" alt="WonderAuth" />
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="text-slate-600 hover:text-slate-900 font-medium transition-colors text-sm">Sign in</button>
                            <button className="px-4 py-2 bg-slate-700 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors shadow-sm text-sm">Start Building</button>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <div className="mx-auto w-full max-w-6xl px-1 sm:px-1 mt-12">
                    <div className="flex flex-col items-center text-center gap-6 pb-16">
                        <a
                            href="https://crabshq.com/quarterly"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 transition-all shadow-sm"
                        >
                            <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                            <span>Open Sourcing - Soon</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                className="text-gray-400 group-hover:translate-x-1 transition-all"
                            >
                                <path
                                    d="M5 12h14M13 5l7 7-7 7"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </a>

                        <h1 className="max-w-4xl text-[32px] sm:text-[52px] font-semibold tracking-tight text-gray-900 leading-tight">
                            <span className="text-blue-500">Better than Privy</span> <span className=" block">Global Wallets, Half the Price</span>
                        </h1>
                        <p className="max-w-2xl text-gray-600 text-lg">
                            Stop building auth from scratch. Add social logins, magic links, passkeys, and 2FA to your app in minutes. Secure, scalable, and developer-friendly.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2 sm:mt-4 mb-2 sm:mb-2 items-center justify-center px-4 sm:px-0">
                            <div
                                onClick={() => setShowBuilder(true)}
                                className="flex items-center justify-center py-3 sm:py-3 px-6 sm:px-6 bg-red-600 text-white rounded-md font-medium hover:bg-red-700 transition-colors w-full sm:w-auto relative text-sm sm:text-base min-h-[48px] sm:min-h-auto cursor-pointer"
                            >
                                <div className="relative overflow-hidden mr-2 h-5 sm:h-5">
                                    <div className="transition-transform duration-150 whitespace-nowrap">
                                        Setup in 15 mins
                                    </div>
                                </div>
                            </div>

                            <Link
                                href="https://wonder-auth-demo.netlify.app/"
                                target="_blank"
                                className="text-black border border-gray-600 bg-white hover:bg-slate-800 hover:text-white flex items-center justify-center px-4 py-2.5 sm:py-2.5 rounded-md transition duration-150 ease-in-out group w-full sm:w-auto text-sm sm:text-base min-h-[48px] sm:min-h-auto sm:ml-0"
                            >
                                <div className="flex items-center justify-center w-full">
                                    <span>Try a Demo</span>
                                    <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* Product Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <a
                            href="https://crabshq.com/app"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group block rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-all p-5 hover:shadow-md"
                        >
                            <div className="relative h-56 rounded-lg overflow-hidden border border-gray-200 mb-4">
                                <img
                                    src="https://dazzling-cat.netlify.app/globalwallets.png"
                                    alt="Global Wallets"
                                    className="object-contain w-full h-full group-hover:scale-110 transition-all"
                                />
                                <div className="absolute top-4 right-4 bg-white/90 text-blue-600 text-sm px-3 py-1 rounded-full border border-gray-200 shadow-sm">
                                    All Ecosystem
                                </div>
                            </div>
                            <h3 className="text-gray-900 text-lg font-medium mb-1">
                                Global Wallets
                            </h3>
                            <p className="text-gray-600 text-sm">
                                One Wallet across all the CrabsHQ Auth integrated ecosytem.
                            </p>
                        </a>

                        <a
                            href="https://crabshq.com/staking-as-a-service"
                            className="group block rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-all p-5 hover:shadow-md"
                        >
                            <div className="relative h-56 rounded-lg overflow-hidden border border-gray-200 mb-4">
                                <img
                                    src="https://dazzling-cat.netlify.app/embeddedwallets.png"
                                    alt="Embedded Wallet"
                                    className="object-contain w-full h-full group-hover:scale-110 transition-all"
                                />
                                <div className="absolute top-4 right-4 bg-white/90 text-blue-500 text-sm px-3 py-1 rounded-full border border-gray-200 shadow-sm">
                                    Coinbase x402
                                </div>
                            </div>
                            <h3 className="text-gray-900 text-lg font-medium mb-1">
                                Embedded Wallet
                            </h3>
                            <p className="text-gray-600 text-sm">
                                when a user logs in via Privy, you can provision a wallet behind the scenes.
                            </p>
                        </a>
                    </div>

                    {/* Gateway & Ironforge */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <a
                            href="https://crabshq.com/gateway"
                            className="group block rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-all p-5 hover:shadow-md"
                        >
                            <div className="relative h-56 rounded-lg overflow-hidden border border-gray-200 mb-4">
                                <img
                                    src="https://dazzling-cat.netlify.app/depositwithdrawl.png"
                                    alt="Gateway"
                                    className="object-contain w-full h-full group-hover:scale-110 transition-all"
                                />
                                <div className="absolute top-4 right-4 bg-white/90 text-purple-500 text-sm px-3 py-1 rounded-full border border-gray-200 shadow-sm">
                                    Defi
                                </div>
                            </div>
                            <h3 className="text-gray-900 text-lg font-medium mb-1">Deposit & Withdrawls </h3>
                            <p className="text-gray-600 text-sm">
                                Onboard Web3 with defi integrations
                            </p>
                        </a>

                        <a
                            href="https://crabshq.com/ironforge"
                            className="group block rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-all p-5 hover:shadow-md"
                        >
                            <div className="relative h-56 rounded-lg overflow-hidden border border-gray-200 mb-4">
                                <img
                                    src="https://dazzling-cat.netlify.app/ironforge.png"
                                    alt="Ironforge Security"
                                    className="object-contain w-full h-full group-hover:scale-110 transition-all"
                                />
                                <div className="absolute top-4 right-4 bg-white/90 text-red-500 text-sm px-3 py-1 rounded-full border border-gray-200 shadow-sm">
                                    Degens Defend Encryption
                                </div>
                            </div>
                            <h3 className="text-gray-900 text-lg font-medium mb-1">Ironforge Security</h3>
                            <p className="text-gray-600 text-sm">
                                Everything encrypted.
                            </p>
                        </a>
                    </div>
                </div>
            </div>

            {/* Builder Modal */}
            {showBuilder && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
                    <div className="bg-slate-50 rounded-3xl shadow-2xl w-full max-w-7xl max-h-[90vh] flex flex-col border border-gray-200">
                        {/* Header */}
                        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-200">
                            <div className="flex items-center gap-3">
                                <img src="https://dazzling-cat.netlify.app/wonderauth.png" className="h-7" alt="WonderAuth" />
                                <div className="h-6 w-px bg-gray-300"></div>
                                <h2 className="text-xl font-semibold text-gray-900">Builder</h2>
                            </div>
                            <button
                                onClick={() => setShowBuilder(false)}
                                className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex-1 flex overflow-hidden">
                            {/* Left Panel - Configuration */}
                            <div className="w-1/3 border-r border-gray-200 overflow-y-auto p-6 bg-white">
                                <div className="space-y-6">
                                    {/* Logo Customization */}
                                    <div className="bg-white backdrop-blur-sm rounded-xl border border-gray-200 p-5 shadow-sm">
                                        <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
                                                <svg className="w-4 h-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            Custom Logo
                                        </h3>

                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-16 h-16 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center overflow-hidden">
                                                    <img
                                                        src={customLogo}
                                                        alt="Logo Preview"
                                                        className="w-full h-full object-contain p-2"
                                                        onError={(e) => {
                                                            e.currentTarget.src = 'https://dazzling-cat.netlify.app/astralogo.png';
                                                        }}
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-xs text-gray-500 mb-2">Logo URL</p>
                                                    <input
                                                        type="text"
                                                        value={customLogo}
                                                        onChange={(e) => setCustomLogo(e.target.value)}
                                                        placeholder="Enter image URL"
                                                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
                                                    />
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => setCustomLogo('https://dazzling-cat.netlify.app/astralogo.png')}
                                                className="w-full py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg text-gray-700 text-sm font-medium transition-all"
                                            >
                                                Reset to Default
                                            </button>
                                        </div>
                                    </div>

                                    {/* Social Providers */}
                                    <div className="bg-white backdrop-blur-sm rounded-xl border border-gray-200 p-5 shadow-sm">
                                        <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                                                <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                </svg>
                                            </div>
                                            Social Providers
                                        </h3>
                                        <p className="text-xs text-gray-500 mb-4">
                                            Select up to 2 providers ({getEnabledSocialCount()}/2 selected)
                                        </p>
                                        <div className="grid grid-cols-2 gap-2">
                                            {Object.entries({
                                                google: 'Google',
                                                discord: 'Discord',
                                                telegram: 'Telegram',
                                                github: 'Github',
                                                x: 'X',
                                                facebook: 'Facebook',
                                                apple: 'Apple',
                                                farcaster: 'Farcaster',
                                            }).map(([key, name]) => {
                                                const isEnabled = socialProviders[key as SocialProvider];
                                                const isDisabled = !isEnabled && getEnabledSocialCount() >= 2;

                                                return (
                                                    <label
                                                        key={key}
                                                        className={`flex items-center gap-2 text-sm cursor-pointer p-3 rounded-lg border border-gray-200 bg-white transition-all ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
                                                            }`}
                                                    >
                                                        <div className="relative flex-shrink-0">
                                                            <input
                                                                type="checkbox"
                                                                checked={isEnabled}
                                                                onChange={() => toggleSocialProvider(key as SocialProvider)}
                                                                disabled={isDisabled}
                                                                className="w-5 h-5 rounded border-gray-300 text-gray-600 focus:ring-gray-500 opacity-0 absolute"
                                                            />
                                                            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${isEnabled ? 'bg-gray-600 border-gray-600' : 'border-gray-300 bg-white'
                                                                }`}>
                                                                {isEnabled && <Check className="w-3 h-3 text-white" />}
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-2 flex-1 min-w-0">
                                                            {getSocialIcon(key as SocialProvider)}
                                                            <span className="text-gray-700 truncate">{name}</span>
                                                        </div>
                                                    </label>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* Auth Methods */}
                                    <div className="bg-white backdrop-blur-sm rounded-xl border border-gray-200 p-5 shadow-sm">
                                        <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                                                <Key className="w-4 h-4 text-blue-600" />
                                            </div>
                                            Auth Methods
                                        </h3>
                                        <div className="grid grid-cols-2 gap-2">
                                            <label className="flex items-center gap-2 text-sm cursor-pointer p-3 rounded-lg hover:bg-gray-50 border border-gray-200 bg-white transition-all">
                                                <div className="relative flex-shrink-0">
                                                    <input type="checkbox" checked={showEmail} onChange={() => setShowEmail(!showEmail)} className="w-5 h-5 rounded border-gray-300 text-gray-600 focus:ring-gray-500 opacity-0 absolute" />
                                                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${showEmail ? 'bg-gray-600 border-gray-600' : 'border-gray-300'}`}>
                                                        {showEmail && <Check className="w-3 h-3 text-white" />}
                                                    </div>
                                                </div>
                                                <Mail className="w-4 h-4 text-gray-600 flex-shrink-0" />
                                                <span className="text-gray-700 truncate">Email</span>
                                            </label>
                                            <label className="flex items-center gap-2 text-sm cursor-pointer p-3 rounded-lg hover:bg-gray-50 border border-gray-200 bg-white transition-all">
                                                <div className="relative flex-shrink-0">
                                                    <input type="checkbox" checked={showPhone} onChange={() => setShowPhone(!showPhone)} className="w-5 h-5 rounded border-gray-300 text-gray-600 focus:ring-gray-500 opacity-0 absolute" />
                                                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${showPhone ? 'bg-gray-600 border-gray-600' : 'border-gray-300'}`}>
                                                        {showPhone && <Check className="w-3 h-3 text-white" />}
                                                    </div>
                                                </div>
                                                <Phone className="w-4 h-4 text-gray-600 flex-shrink-0" />
                                                <span className="text-gray-700 truncate">Phone</span>
                                            </label>
                                            <label className="flex items-center gap-2 text-sm cursor-pointer p-3 rounded-lg hover:bg-gray-50 border border-gray-200 bg-white transition-all">
                                                <div className="relative flex-shrink-0">
                                                    <input type="checkbox" checked={showPasskey} onChange={() => setShowPasskey(!showPasskey)} className="w-5 h-5 rounded border-gray-300 text-gray-600 focus:ring-gray-500 opacity-0 absolute" />
                                                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${showPasskey ? 'bg-gray-600 border-gray-600' : 'border-gray-300'}`}>
                                                        {showPasskey && <Check className="w-3 h-3 text-white" />}
                                                    </div>
                                                </div>
                                                <Key className="w-4 h-4 text-gray-600 flex-shrink-0" />
                                                <span className="text-gray-700 truncate">Passkey</span>
                                            </label>
                                            <label className="flex items-center gap-2 text-sm cursor-pointer p-3 rounded-lg hover:bg-gray-50 border border-gray-200 bg-white transition-all">
                                                <div className="relative flex-shrink-0">
                                                    <input type="checkbox" checked={showWallet} onChange={() => setShowWallet(!showWallet)} className="w-5 h-5 rounded border-gray-300 text-gray-600 focus:ring-gray-500 opacity-0 absolute" />
                                                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${showWallet ? 'bg-gray-600 border-gray-600' : 'border-gray-300'}`}>
                                                        {showWallet && <Check className="w-3 h-3 text-white" />}
                                                    </div>
                                                </div>
                                                <Wallet className="w-4 h-4 text-gray-600 flex-shrink-0" />
                                                <span className="text-gray-700 truncate">Wallet</span>
                                            </label>
                                        </div>
                                    </div>

                                    {/* Wallets */}
                                    <div className="bg-white backdrop-blur-sm rounded-xl border border-gray-200 p-5 shadow-sm">
                                        <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                                                <Wallet className="w-4 h-4 text-purple-600" />
                                            </div>
                                            Wallets
                                        </h3>
                                        <div className="grid grid-cols-2 gap-2">
                                            {Object.entries(walletNames).map(([key, name]) => (
                                                <div key={key} className="flex items-center justify-between text-sm p-3 rounded-lg hover:bg-gray-50 border border-gray-200 bg-white transition-all">
                                                    <div className="flex items-center gap-2 flex-1 min-w-0">
                                                        <img
                                                            src={walletLogos[key]}
                                                            alt={name}
                                                            className="w-5 h-5 rounded object-contain flex-shrink-0"
                                                            onError={(e) => { e.currentTarget.style.display = 'none' }}
                                                        />
                                                        <span className="text-gray-700 text-xs truncate">{name}</span>
                                                    </div>
                                                    <div className="relative flex-shrink-0">
                                                        <input
                                                            type="checkbox"
                                                            checked={wallets[key as WalletType]}
                                                            onChange={() => toggleWallet(key as WalletType)}
                                                            className="w-5 h-5 rounded border-gray-300 text-gray-600 focus:ring-gray-500 opacity-0 absolute"
                                                        />
                                                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${wallets[key as WalletType] ? 'bg-gray-600 border-gray-600' : 'border-gray-300'}`}>
                                                            {wallets[key as WalletType] && <Check className="w-3 h-3 text-white" />}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Guest Mode */}
                                    <div className="bg-white backdrop-blur-sm rounded-xl border border-gray-200 p-5 shadow-sm">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                                                    <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <h3 className="text-sm font-semibold text-gray-900">Guest Mode</h3>
                                                    <p className="text-xs text-gray-500">Allow users to continue without auth</p>
                                                </div>
                                            </div>
                                            <div className="relative flex-shrink-0">
                                                <input
                                                    type="checkbox"
                                                    checked={showGuestMode}
                                                    onChange={() => setShowGuestMode(!showGuestMode)}
                                                    className="w-5 h-5 rounded border-gray-300 text-gray-600 focus:ring-gray-500 opacity-0 absolute"
                                                />
                                                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${showGuestMode ? 'bg-gray-600 border-gray-600' : 'border-gray-300'}`}>
                                                    {showGuestMode && <Check className="w-3 h-3 text-white" />}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Gasless Transactions */}
                                    <div className="bg-white backdrop-blur-sm rounded-xl border border-gray-200 p-5 shadow-sm">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                                                    <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <h3 className="text-sm font-semibold text-gray-900">Gasless Transactions</h3>
                                                    <p className="text-xs text-gray-500">Enable x402 gasless transactions</p>
                                                </div>
                                            </div>
                                            <div className="relative flex-shrink-0">
                                                <input
                                                    type="checkbox"
                                                    checked={enableGasless}
                                                    onChange={() => setEnableGasless(!enableGasless)}
                                                    className="w-5 h-5 rounded border-gray-300 text-gray-600 focus:ring-gray-500 opacity-0 absolute"
                                                />
                                                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${enableGasless ? 'bg-gray-600 border-gray-600' : 'border-gray-300'}`}>
                                                    {enableGasless && <Check className="w-3 h-3 text-white" />}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Panel - Preview */}
                            <div className="flex-1 overflow-y-auto bg-slate-50 relative">

                                <div className="flex justify-between w-full bg-red-100 text-red-900 items-center p-2 px-6 m-auto mb-4">
                                    Checkout the live demo
                                    <button className="bg-red-600 text-white h-fit px-2 py-1 rounded-lg font-bold hover:shadow-lg hover:shadow-[#e0a984]/50 transition-all">
                                        Try Live
                                    </button>
                                </div>

                                <div className="flex justify-between relative mb-6 px-6">
                                    <div className="bg-white p-1.5 rounded-xl w-fit shadow-sm">
                                        <button onClick={() => setActiveTab('modal')} className={`px-5 py-2.5 rounded-lg font-medium transition-all ${activeTab === 'modal' ? 'bg-slate-100 text-gray-900 shadow' : 'text-gray-600 hover:text-gray-900'}`}>Modal</button>
                                        <button onClick={() => setActiveTab('button')} className={`px-5 py-2.5 rounded-lg font-medium transition-all ${activeTab === 'button' ? 'bg-slate-100 text-gray-900 shadow' : 'text-gray-600 hover:text-gray-900'}`}>Button</button>
                                        <button onClick={() => setActiveTab('code')} className={`px-5 py-2.5 rounded-lg font-medium transition-all ${activeTab === 'code' ? 'bg-slate-100 text-gray-900 shadow' : 'text-gray-600 hover:text-gray-900'}`}>Code</button>
                                    </div>

                                    <button className="bg-slate-900 text-white h-fit px-6 py-3 rounded-lg font-bold hover:shadow-lg hover:shadow-[#e0a984]/50 transition-all">
                                        Deploy Auth
                                    </button>
                                </div>

                                {activeTab === 'modal' && (
                                    <div className="flex items-center justify-center min-h-[600px]">
                                        <div className="bg-gradient-to-br from-black to-[#1a1a1a] rounded-3xl shadow-2xl border border-[#e0a984]/30 p-8 w-full max-w-md relative animate-slideUp">
                                            <button
                                                onClick={() => setPreviewShowWallets(false)}
                                                className="absolute top-6 right-6 w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                                            >
                                                <X size={20} className="text-white/80" />
                                            </button>

                                            {!previewShowWallets ? (
                                                <>
                                                    <div className="text-center mb-8">
                                                        <div className="w-32 mx-auto mb-6 flex items-center justify-center">
                                                            <img
                                                                src={customLogo}
                                                                alt="Logo"
                                                                className="max-w-full h-auto"
                                                                onError={(e) => {
                                                                    e.currentTarget.src = 'https://dazzling-cat.netlify.app/astralogo.png';
                                                                }}
                                                            />
                                                        </div>
                                                        <p className="text-white/60">Choose your authentication method</p>
                                                    </div>

                                                    <div className="flex flex-row gap-3">
                                                        {getEnabledSocialProviders().slice(0, 2).map((provider) => (
                                                            <button
                                                                key={provider}
                                                                disabled={loading}
                                                                className="w-full py-4 bg-white/5 hover:bg-white/10 border border-[#e0a984]/20 hover:border-[#e0a984]/40 rounded-2xl font-semibold flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                                            >
                                                                {loading ? <Loader2 size={20} className="animate-spin text-white" /> : getSocialIcon(provider)}
                                                                <span className="text-white">Continue with {provider.charAt(0).toUpperCase() + provider.slice(1)}</span>
                                                            </button>
                                                        ))}

                                                        {(getEnabledSocialProviders().length > 0 || showWallet) && (
                                                            <div className="flex items-center gap-4 my-6">
                                                                <div className="flex-1 h-px bg-[#e0a984]/20" />
                                                                <span className="text-sm text-white/40">OR</span>
                                                                <div className="flex-1 h-px bg-[#e0a984]/20" />
                                                            </div>
                                                        )}

                                                        {showWallet && (
                                                            <button
                                                                onClick={() => setPreviewShowWallets(true)}
                                                                disabled={loading}
                                                                className="w-full py-4 bg-gradient-to-r from-[#e0a984] to-[#e0a984] text-black rounded-2xl font-bold flex items-center justify-center gap-2.5 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:shadow-lg hover:shadow-[#e0a984]/50"
                                                            >
                                                                <Wallet size={20} />
                                                                Connect Wallet
                                                            </button>
                                                        )}

                                                        {showGuestMode && (
                                                            <button
                                                                disabled={loading}
                                                                className="w-full py-4 bg-white/5 hover:bg-white/10 border border-[#e0a984]/20 hover:border-[#e0a984]/40 rounded-2xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all text-white"
                                                            >
                                                                Guest Mode
                                                            </button>
                                                        )}
                                                    </div>

                                                    <div className="mt-8 p-4 rounded-2xl text-center">
                                                        <p className="text-sm text-slate-400 font-medium flex items-center justify-center gap-1">
                                                            Protected by
                                                            <img
                                                                src="https://dazzling-cat.netlify.app/wonderauth.png"
                                                                className="h-5 opacity-75 brightness-[7.75] filter grayscale"
                                                                alt="WonderAuth"
                                                            />
                                                        </p>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="mb-6 flex items-center gap-3">
                                                        <button
                                                            onClick={() => setPreviewShowWallets(false)}
                                                            className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                                                        >
                                                            <ArrowLeft size={18} className="text-white" />
                                                        </button>
                                                        <h2 className="text-2xl font-bold text-white">Connect Wallet</h2>
                                                    </div>

                                                    <div className="mb-5">
                                                        <h3 className="text-xs font-semibold text-white/50 mb-3 uppercase tracking-wide flex items-center gap-2">
                                                            <img
                                                                src="https://cdn-icons-png.flaticon.com/512/14446/14446160.png"
                                                                alt="Ethereum"
                                                                className="w-4 h-4"
                                                            />
                                                            Available Wallets
                                                        </h3>
                                                        {getEnabledWallets().map((walletKey) => (
                                                            <button
                                                                key={walletKey}
                                                                className="w-full p-4 bg-white/5 hover:bg-white/10 border border-[#e0a984]/20 hover:border-[#e0a984]/40 rounded-2xl mb-3 flex items-center gap-3 transition-all"
                                                            >
                                                                <img
                                                                    src={walletLogos[walletKey]}
                                                                    alt={walletNames[walletKey]}
                                                                    className="w-10 h-10 rounded-xl object-contain"
                                                                    onError={(e) => { e.currentTarget.style.display = 'none' }}
                                                                />
                                                                <div className="flex-1 text-left">
                                                                    <div className="font-semibold text-white">{walletNames[walletKey]}</div>
                                                                    <div className="text-sm text-white/60">Connect to continue</div>
                                                                </div>
                                                                <ArrowRight size={20} className="text-[#e0a984]" />
                                                            </button>
                                                        ))}
                                                    </div>

                                                    <div className="mt-5 p-4 rounded-2xl text-center">
                                                        <p className="text-sm text-slate-400 font-medium flex items-center justify-center gap-1">
                                                            Protected by
                                                            <img
                                                                src="https://dazzling-cat.netlify.app/wonderauth.png"
                                                                className="h-5 opacity-75 brightness-[7.75] filter grayscale"
                                                                alt="WonderAuth"
                                                            />
                                                        </p>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'button' && (
                                    <div className="flex items-center justify-center min-h-[600px] bg-white rounded-xl border border-gray-200 m-4">
                                        <button className="px-8 py-4 bg-gradient-to-r from-[#e0a984] to-[#e0a984] text-black rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-[#e0a984]/50 transition-all">
                                            Login with Wonder
                                        </button>
                                    </div>
                                )}

                                {activeTab === 'code' && (
                                    <div className="bg-gray-900 rounded-xl p-6 text-gray-100 font-mono text-sm overflow-x-auto shadow-lg border border-gray-200 m-6">
                                        <pre className="whitespace-pre-wrap text-white/90">
                                            {`import { WonderAuth } from '@wonder/auth';

export default function App() {
  return (
    <WonderAuth
      config={{
        logo: "${customLogo}",
        providers: {
          social: [${getEnabledSocialProviders().map(p => `"${p}"`).join(', ')}],
          email: ${showEmail},
          phone: ${showPhone},
          passkey: ${showPasskey},
        },
        wallets: [${getEnabledWallets().map(w => `"${w}"`).join(', ')}],
        features: {
          guestMode: ${showGuestMode},
          gaslessTransactions: ${enableGasless},
        },
      }}
    />
  );
}`}
                                        </pre>
                                    </div>
                                )}




                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}