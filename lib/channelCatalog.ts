/** OpenClaw messaging channels — sourced from Trooper openclaw-channel-catalog.js */

export type ChannelExtraField = {
  key: string;
  label: string;
  placeholder: string;
  secret?: boolean;
};

export type ChannelCatalogItem = {
  id: string;
  name: string;
  desc: string;
  setupVideoUrl?: string;
  icon: string;
  tokenField: string;
  tokenLabel: string;
  tokenPlaceholder: string;
  steps: string[];
  extraFields?: ChannelExtraField[];
  defaultRoutingId?: string;
};

export const OPENCLAW_CHANNELS: ChannelCatalogItem[] = [
  {
    id: 'slack',
    name: 'Slack',
    desc: 'Bring your assistant into Slack channels and direct messages.',
    setupVideoUrl: 'https://example.com/Trooper-setup/slack',
    icon: 'https://slack.com/favicon.ico',
    tokenField: 'slackToken',
    tokenLabel: 'Bot Token',
    tokenPlaceholder: 'xoxb-...',
    steps: [
      'Go to api.slack.com/apps and create a new Slack App',
      'Add Bot Token Scopes: chat:write, channels:read, im:read, im:write',
      'Install the app to your workspace and copy the Bot User OAuth Token',
      'Paste the token in Trooper Settings → Secrets',
    ],
    defaultRoutingId: 'DM',
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    desc: 'Send and receive messages on WhatsApp via the Business API.',
    setupVideoUrl: 'https://example.com/Trooper-setup/whatsapp',
    icon: 'https://www.whatsapp.com/favicon.ico',
    tokenField: 'whatsappToken',
    tokenLabel: 'Access Token',
    tokenPlaceholder: 'EAAx...',
    steps: [
      'Create a Meta Business account and set up WhatsApp Business API',
      'In the Meta Developer Portal, create a WhatsApp app',
      'Generate a permanent access token under API Setup',
      'Add the access token and Phone Number ID in Trooper Settings → Secrets',
    ],
    extraFields: [
      { key: 'whatsappPhoneId', label: 'Phone Number ID', placeholder: '1234567890' },
    ],
    defaultRoutingId: 'DM',
  },
  {
    id: 'telegram',
    name: 'Telegram',
    desc: 'Connect your Telegram bot to send and receive messages from your assistant.',
    setupVideoUrl: 'https://example.com/Trooper-setup/telegram',
    icon: 'https://telegram.org/favicon.ico',
    tokenField: 'telegramToken',
    tokenLabel: 'Bot Token',
    tokenPlaceholder: '123456789:ABCdef...',
    steps: [
      'Open Telegram and message @BotFather',
      'Send /newbot and follow the prompts to create your bot',
      'Copy the bot token BotFather gives you',
      'Paste the token in Trooper Settings → Secrets',
    ],
    defaultRoutingId: 'DM',
  },
  {
    id: 'discord',
    name: 'Discord',
    desc: 'Use your assistant inside Discord servers and DMs.',
    setupVideoUrl: 'https://example.com/Trooper-setup/discord',
    icon: 'https://cdn.prod.website-files.com/6257adef93867e50d84d30e2/6266bc493fb42d4e27bb8393_847541504914fd33810e70a0ea73177e.ico',
    tokenField: 'discordToken',
    tokenLabel: 'Bot Token',
    tokenPlaceholder: 'MTIz...abc',
    steps: [
      'Go to the Discord Developer Portal and create a new Application',
      'Navigate to Bot → Add Bot, then copy the bot token',
      'Under OAuth2 → URL Generator, select "bot" scope and invite to your server',
      'Paste the bot token in Trooper Settings → Secrets',
    ],
    defaultRoutingId: 'DM',
  },
  {
    id: 'signal',
    name: 'Signal',
    desc: 'Private end-to-end encrypted messaging via the Signal CLI REST API.',
    setupVideoUrl: 'https://example.com/Trooper-setup/signal',
    icon: 'https://signal.org/assets/images/header/logo.png',
    tokenField: 'signalApiUrl',
    tokenLabel: 'Signal CLI REST API URL',
    tokenPlaceholder: 'http://localhost:8080',
    steps: [
      'Run the signal-cli-rest-api Docker container (bbernhard/signal-cli-rest-api)',
      'Register or link your phone number with signal-cli',
      'The REST API runs on port 8080 by default — paste the URL in Trooper',
      'Add your phone number in Settings → Secrets',
    ],
    extraFields: [
      { key: 'signalPhoneNumber', label: 'Phone Number', placeholder: '+1234567890' },
    ],
  },
  {
    id: 'imessage',
    name: 'iMessage',
    desc: 'Connect iMessage through a Mac relay for personal or business messaging.',
    setupVideoUrl: 'https://example.com/Trooper-setup/imessage',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IMessage_logo.svg/120px-IMessage_logo.svg.png',
    tokenField: 'imessageRelayUrl',
    tokenLabel: 'Relay URL',
    tokenPlaceholder: 'http://192.168.1.x:8080',
    steps: [
      'On a Mac that stays online, install the BlueBubbles or Beeper relay server',
      'BlueBubbles: github.com/BlueBubblesApp — set up the server and enable the API',
      'Copy the relay URL and API password',
      'Paste both in Trooper Settings → Secrets',
    ],
    extraFields: [
      { key: 'imessageRelayPassword', label: 'API Password', placeholder: 'your-api-password', secret: true },
    ],
  },
  {
    id: 'email',
    name: 'Email',
    desc: 'Send and receive emails through your assistant via IMAP/SMTP.',
    setupVideoUrl: 'https://example.com/Trooper-setup/email',
    icon: 'https://ssl.gstatic.com/ui/v1/icons/mail/rfr/gmail.ico',
    tokenField: 'emailImapHost',
    tokenLabel: 'IMAP Host',
    tokenPlaceholder: 'imap.gmail.com',
    steps: [
      'For Gmail: enable IMAP in Settings → Forwarding and POP/IMAP',
      'Create an App Password at myaccount.google.com/apppasswords',
      'For other providers: get your IMAP/SMTP server details from your email provider',
      'Fill in IMAP, SMTP, address, and app password in Trooper Settings → Secrets',
    ],
    extraFields: [
      { key: 'emailSmtpHost', label: 'SMTP Host', placeholder: 'smtp.gmail.com' },
      { key: 'emailAddress', label: 'Email Address', placeholder: 'you@example.com' },
      { key: 'emailPassword', label: 'App Password', placeholder: 'xxxx xxxx xxxx xxxx', secret: true },
    ],
  },
];

export function domainFromChannelIcon(iconUrl: string): string | null {
  if (!iconUrl) return null;
  try {
    const host = new URL(iconUrl).hostname.replace(/^www\./, '');
    return host || null;
  } catch {
    return null;
  }
}

export function getChannelBySlug(slug: string): ChannelCatalogItem | undefined {
  return OPENCLAW_CHANNELS.find((c) => c.id === slug);
}

export function allChannelSlugs(): string[] {
  return OPENCLAW_CHANNELS.map((c) => c.id);
}
