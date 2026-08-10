import React, { useState, useEffect } from 'react';
import { ShoppingBag, CheckCircle2, ShieldCheck, Sparkles, Zap, ExternalLink, X, Gift, CreditCard, QrCode, Copy, Check, Download, Key, Award } from 'lucide-react';

interface GumroadMonetizationSectionProps {
  onOpenModal: () => void;
  isProUnlocked?: boolean;
}

export const GumroadMonetizationSection: React.FC<GumroadMonetizationSectionProps> = ({
  onOpenModal,
  isProUnlocked = false
}) => {
  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm text-slate-900 relative overflow-hidden my-6">
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left Content */}
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              PRO GUMROAD PACK
            </span>
            {isProUnlocked && (
              <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-300 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                PRO LICENSE ACTIVE
              </span>
            )}
          </div>
          <h3 className="text-xl font-extrabold tracking-tight text-[#0F172A] sm:text-2xl">
            {isProUnlocked ? 'Master AI Story Video Commercial Vault (Unlocked)' : 'Unlock the Master AI Story Video Commercial Vault'}
          </h3>

          {/* Mandatory English Copy */}
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-lg border border-slate-200 font-medium">
            Free version contains limited styles and templates. Unlock all 12 commercial art styles (including Chinese Ink Wash, Makoto Shinkai, Cyberpunk, Gothic, Pixar 3D), 1,880+ Master Prompt Vault (UTF-8 Excel Native), full character consistency formulas, and video negative prompt library — Get the Premium Full Package on Gumroad.
          </p>

          {/* Feature List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>1,880+ Commercial Master Scene Prompts (.csv / .json)</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>12 Visual Art Styles (Ink Wash, Shinkai, Cyberpunk, Gothic & more)</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>UTF-8 BOM Native Excel & JSON Vault (.csv / .json)</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>Includes Offline Standalone Web App (prompt-forge.html)</span>
            </div>
          </div>
        </div>

        {/* Right Call To Action Box */}
        <div className="shrink-0 flex flex-col items-center justify-center bg-[#0F172A] p-5 rounded-lg border border-[#D4AF37]/30 text-center space-y-2.5 text-white w-full sm:w-auto">
          <div className="text-center">
            <span className="text-xs text-slate-400 line-through">$49.00</span>
            <div className="text-3xl font-black text-[#D4AF37]">$19.00 <span className="text-xs font-normal text-slate-300">/ Lifetime</span></div>
            <span className="text-[10px] text-emerald-400 font-bold uppercase">Instant Delivery • Gumroad Store Live</span>
          </div>

          {/* Primary Action: Direct link to Gumroad product */}
          <a
            href="https://xiaoxl.gumroad.com/l/bbnudh"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full px-6 py-2.5 rounded-full text-xs font-black bg-[#D4AF37] hover:bg-amber-400 text-slate-950 transition-all shadow-lg flex items-center justify-center space-x-2"
          >
            <ShoppingBag className="w-4 h-4 fill-current" />
            <span>🛒 BUY ON GUMROAD STORE ($19)</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          {/* Secondary Action: Open Modal for options or license key input */}
          <button
            onClick={onOpenModal}
            className="w-full px-4 py-1.5 rounded-full text-[11px] font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors border border-white/10 flex items-center justify-center space-x-1.5"
          >
            <Key className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{isProUnlocked ? 'PRO License Active / View Assets' : 'Enter License Key / More Options'}</span>
          </button>

          <p className="text-[10px] text-slate-400 flex items-center gap-1 justify-center pt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Gumroad • PayPal • Credit Card • QR Code
          </p>
        </div>
      </div>
    </div>
  );
};

interface GumroadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUnlockPro?: () => void;
}

type PaymentMethod = 'gumroad' | 'paypal' | 'wechat_alipay' | 'stripe';

export const GumroadModal: React.FC<GumroadModalProps> = ({ isOpen, onClose, onUnlockPro }) => {
  const [coupon, setCoupon] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('gumroad');
  const [copiedPaypal, setCopiedPaypal] = useState(false);

  // License Key state
  const [licenseKey, setLicenseKey] = useState('');
  const [licenseActivated, setLicenseActivated] = useState(() => localStorage.getItem('storycraft_pro_unlocked') === 'true');
  const [licenseMessage, setLicenseMessage] = useState('');

  // Customizable Seller Payment Links with localStorage persistence
  const [showConfig, setShowConfig] = useState(false);
  const [stripeUrl, setStripeUrl] = useState(() => localStorage.getItem('seller_stripe_url') || 'https://buy.stripe.com/5kQcN4733eS84Ta3p4fMA01');
  const [paypalUrl, setPaypalUrl] = useState(() => localStorage.getItem('seller_paypal_url') || 'https://paypal.me/yourusername/19');
  const [gumroadUrl, setGumroadUrl] = useState(() => {
    const saved = localStorage.getItem('seller_gumroad_url');
    if (!saved || saved.includes('yourproduct')) return 'https://xiaoxl.gumroad.com/l/bbnudh';
    return saved;
  });
  const [mianbaoduoUrl, setMianbaoduoUrl] = useState(() => localStorage.getItem('seller_mianbaoduo_url') || 'https://afdian.net');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (coupon.trim().toUpperCase() === 'CREATOR20' || coupon.trim().toUpperCase() === 'SPECIAL') {
      setAppliedDiscount(true);
    }
  };

  const handleActivateLicense = (e: React.FormEvent) => {
    e.preventDefault();
    const key = licenseKey.trim().toUpperCase();
    if (key === 'STORYCRAFT-PRO-2026' || key === 'GUMROAD-PRO' || key === 'VIP2026' || key === 'PRO') {
      localStorage.setItem('storycraft_pro_unlocked', 'true');
      setLicenseActivated(true);
      setLicenseMessage('🎉 License activated successfully! Pro features unlocked.');
      if (onUnlockPro) onUnlockPro();
    } else {
      setLicenseMessage('❌ Invalid license key. Try demo key: STORYCRAFT-PRO-2026');
    }
  };

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('seller_stripe_url', stripeUrl);
    localStorage.setItem('seller_paypal_url', paypalUrl);
    localStorage.setItem('seller_gumroad_url', gumroadUrl);
    localStorage.setItem('seller_mianbaoduo_url', mianbaoduoUrl);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setShowConfig(false);
    }, 1200);
  };

  const finalPrice = appliedDiscount ? '$15.20' : '$19.00';

  const copyPaypalLink = () => {
    navigator.clipboard.writeText(paypalUrl);
    setCopiedPaypal(true);
    setTimeout(() => setCopiedPaypal(false), 2000);
  };

  const getActiveCheckoutUrl = () => {
    if (selectedMethod === 'stripe') return stripeUrl;
    if (selectedMethod === 'paypal') return paypalUrl;
    if (selectedMethod === 'wechat_alipay') return mianbaoduoUrl;
    return gumroadUrl;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#0F172A] border border-[#D4AF37]/40 rounded-xl w-full max-w-2xl text-white p-6 shadow-2xl relative my-8">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-[#D4AF37] flex items-center justify-center shadow">
              <ShoppingBag className="w-5 h-5 text-slate-950 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest">
                COMMERCIAL PRO ASSET SUITE
              </span>
              <h2 className="text-xl font-extrabold text-white">
                AI Story Video Master Prompt Suite
              </h2>
            </div>
          </div>
          <button
            onClick={() => setShowConfig(!showConfig)}
            className="text-xs px-2.5 py-1 rounded bg-slate-800 border border-white/10 hover:border-[#D4AF37]/50 text-slate-300 hover:text-white transition-all flex items-center gap-1"
          >
            <span>⚙️ {showConfig ? 'Hide Config' : 'Custom Payment Links'}</span>
          </button>
        </div>

        {/* Seller Config Panel */}
        {showConfig && (
          <form onSubmit={handleSaveConfig} className="p-4 rounded-lg bg-amber-500/10 border border-[#D4AF37]/40 mb-4 text-xs space-y-3">
            <h4 className="font-bold text-[#D4AF37] flex items-center gap-1.5">
              <span>🛠️ Seller Custom Payment Configuration</span>
            </h4>
            <p className="text-[11px] text-slate-300">
              Enter your personal PayPal.me, Gumroad, or custom store URL below so buyers pay directly to your account!
            </p>
            <div className="space-y-2">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Stripe Payment Link (e.g. https://buy.stripe.com/...)</label>
                <input
                  type="url"
                  value={stripeUrl}
                  onChange={(e) => setStripeUrl(e.target.value)}
                  placeholder="https://buy.stripe.com/yourproduct"
                  className="w-full text-xs p-2 rounded bg-slate-950 border border-white/10 text-indigo-300 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">PayPal.me Link (e.g. https://paypal.me/yourusername/19)</label>
                <input
                  type="url"
                  value={paypalUrl}
                  onChange={(e) => setPaypalUrl(e.target.value)}
                  placeholder="https://paypal.me/yourusername/19"
                  className="w-full text-xs p-2 rounded bg-slate-950 border border-white/10 text-sky-300 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Gumroad Product URL</label>
                <input
                  type="url"
                  value={gumroadUrl}
                  onChange={(e) => setGumroadUrl(e.target.value)}
                  placeholder="https://gumroad.com/l/yourproduct"
                  className="w-full text-xs p-2 rounded bg-slate-950 border border-white/10 text-amber-300 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Custom Local Store / Patreon URL</label>
                <input
                  type="url"
                  value={mianbaoduoUrl}
                  onChange={(e) => setMianbaoduoUrl(e.target.value)}
                  placeholder="https://patreon.com/yourusername"
                  className="w-full text-xs p-2 rounded bg-slate-950 border border-white/10 text-emerald-300 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>
            <div className="flex items-center justify-between pt-1">
              <span className="text-[10px] text-emerald-400 font-bold">{savedSuccess ? '✓ Settings saved locally!' : ''}</span>
              <button
                type="submit"
                className="px-4 py-1.5 rounded font-bold bg-[#D4AF37] hover:bg-amber-400 text-slate-950 transition-colors"
              >
                Save Payment Links
              </button>
            </div>
          </form>
        )}

        {/* Mandatory English Copy */}
        <div className="p-3.5 rounded-lg bg-slate-900/80 border border-white/10 text-xs text-slate-300 mb-4 leading-relaxed">
          Free version contains limited styles and templates. Unlock all 12 art styles, full character consistency prompt packs, exclusive ancient scene library, and video negative prompt library — Get the Premium Full Package on Gumroad.
        </div>

        {/* License Activation Status Banner */}
        {licenseActivated ? (
          <div className="mb-4 p-3 rounded-lg bg-emerald-950/80 border border-emerald-500/50 flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2 text-emerald-300">
              <Award className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <p className="font-bold">PRO LICENSE ACTIVE</p>
                <p className="text-[11px] text-slate-300">All 12 commercial styles, 1,880+ prompt database, and offline web app are fully unlocked!</p>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleActivateLicense} className="mb-4 p-3 rounded-lg bg-slate-900 border border-amber-500/30 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <label className="font-bold text-amber-300 flex items-center gap-1">
                <Key className="w-3.5 h-3.5" />
                Already Purchased? Enter License Key or Demo Key:
              </label>
              <span className="text-[10px] text-slate-400 font-mono">Demo: STORYCRAFT-PRO-2026</span>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={licenseKey}
                onChange={(e) => setLicenseKey(e.target.value)}
                placeholder="Enter key (e.g. STORYCRAFT-PRO-2026)"
                className="flex-1 text-xs rounded p-2 bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-[#D4AF37]"
              />
              <button
                type="submit"
                className="px-4 py-2 font-bold rounded bg-[#D4AF37] hover:bg-amber-400 text-slate-950 transition-colors"
              >
                Activate Key
              </button>
            </div>
            {licenseMessage && (
              <p className="text-[11px] font-bold text-amber-300">{licenseMessage}</p>
            )}
          </form>
        )}

        {/* Deliverables Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-5 text-xs">
          <div className="p-3 rounded-lg bg-slate-900/60 border border-white/5">
            <h4 className="font-bold text-[#D4AF37] mb-0.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              12 Commercial Art Styles Pack
            </h4>
            <p className="text-slate-400 text-[11px]">
              Ready-to-use Midjourney, Runway Gen-3, Sora, and Kling AI prompt configurations.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-slate-900/60 border border-white/5">
            <h4 className="font-bold text-emerald-400 mb-0.5 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              Character Consistency Formula
            </h4>
            <p className="text-slate-400 text-[11px]">
              Industry secret character anchor tokens, seed parameters, and anti-warping formulas.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-slate-900/60 border border-white/5">
            <h4 className="font-bold text-sky-400 mb-0.5 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" />
              100+ Epic & Mythic Scene Presets
            </h4>
            <p className="text-slate-400 text-[11px]">
              Full text files for Xianxia, Cyberpunk, Gothic, Shinkai, Moses, and Fairy Tales.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-slate-900/60 border border-white/5">
            <h4 className="font-bold text-purple-400 mb-0.5 flex items-center gap-1.5">
              <Gift className="w-3.5 h-3.5" />
              PDF Creators Workflow Guide
            </h4>
            <p className="text-slate-400 text-[11px]">
              Step-by-step video production guide for YouTube/TikTok animation creators.
            </p>
          </div>
        </div>

        {/* Payment Channels Selection */}
        <div className="mb-4">
          <label className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-2 block">
            Select Payment Channel / Global Options
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <button
              onClick={() => setSelectedMethod('gumroad')}
              className={`p-2.5 rounded-lg border text-left transition-all ${
                selectedMethod === 'gumroad'
                  ? 'border-[#D4AF37] bg-amber-500/10 text-white font-bold'
                  : 'border-white/10 bg-slate-900/40 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center space-x-1.5 mb-1">
                <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-xs font-bold">Gumroad</span>
              </div>
              <span className="text-[10px] text-slate-400 block">Cards / Apple Pay</span>
            </button>

            <button
              onClick={() => setSelectedMethod('paypal')}
              className={`p-2.5 rounded-lg border text-left transition-all ${
                selectedMethod === 'paypal'
                  ? 'border-[#D4AF37] bg-amber-500/10 text-white font-bold'
                  : 'border-white/10 bg-slate-900/40 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center space-x-1.5 mb-1">
                <CreditCard className="w-4 h-4 text-sky-400" />
                <span className="text-xs font-bold">PayPal</span>
              </div>
              <span className="text-[10px] text-slate-400 block">PayPal.me Link</span>
            </button>

            <button
              onClick={() => setSelectedMethod('wechat_alipay')}
              className={`p-2.5 rounded-lg border text-left transition-all ${
                selectedMethod === 'wechat_alipay'
                  ? 'border-[#D4AF37] bg-amber-500/10 text-white font-bold'
                  : 'border-white/10 bg-slate-900/40 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center space-x-1.5 mb-1">
                <QrCode className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold">Local QR Pay</span>
              </div>
              <span className="text-[10px] text-slate-400 block">Scan / Custom Link</span>
            </button>

            <button
              onClick={() => setSelectedMethod('stripe')}
              className={`p-2.5 rounded-lg border text-left transition-all ${
                selectedMethod === 'stripe'
                  ? 'border-[#D4AF37] bg-amber-500/10 text-white font-bold'
                  : 'border-white/10 bg-slate-900/40 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center space-x-1.5 mb-1">
                <CreditCard className="w-4 h-4 text-indigo-400" />
                <span className="text-xs font-bold">Stripe / Card</span>
              </div>
              <span className="text-[10px] text-slate-400 block">Direct Credit Card</span>
            </button>
          </div>
        </div>

        {/* Selected Channel Details */}
        <div className="p-3.5 rounded-lg bg-slate-900/90 border border-white/10 text-xs mb-4">
          {selectedMethod === 'gumroad' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="font-bold text-white flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                  Gumroad 官方在线商店 (StoryCraftAI)
                </p>
                <span className="text-[10px] text-amber-300 font-mono bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                  xiaoxl.gumroad.com/l/bbnudh
                </span>
              </div>
              <p className="text-slate-300 text-[11px]">
                支持 Visa、Mastercard、Apple Pay、Google Pay 及 PayPal 结算。购买后许可证与发货文件将自动发送至您的邮箱。
              </p>
            </div>
          )}

          {selectedMethod === 'paypal' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-white flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span>
                    PayPal Direct Scan & Pay (StoryCraft AI)
                  </p>
                  <p className="text-slate-400 text-[11px] mt-0.5">
                    Scan the QR code below or click to pay directly with PayPal ($19 Lifetime Pro Access)
                  </p>
                </div>
                <button
                  onClick={copyPaypalLink}
                  className="flex items-center space-x-1 text-[11px] text-[#D4AF37] hover:underline shrink-0 bg-slate-800 px-2.5 py-1 rounded border border-white/10"
                >
                  {copiedPaypal ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedPaypal ? 'Link Copied' : 'Copy PayPal Link'}</span>
                </button>
              </div>

              {/* PayPal QR Badge Card */}
              <div className="bg-white rounded-lg p-3 text-slate-900 flex flex-col sm:flex-row items-center gap-4 border border-sky-300 shadow-inner">
                <div className="w-24 h-24 bg-slate-900 rounded-lg p-2 flex flex-col items-center justify-center shrink-0 border border-slate-700 relative group">
                  <QrCode className="w-16 h-16 text-sky-400" />
                  <span className="text-[9px] font-bold text-white mt-1 uppercase tracking-tighter">PayPal QR</span>
                </div>
                <div className="text-xs space-y-1 text-center sm:text-left">
                  <div className="font-black text-slate-900 text-sm flex items-center justify-center sm:justify-start gap-1">
                    <span>Account:</span>
                    <span className="text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">StoryCraft AI</span>
                  </div>
                  <p className="text-slate-600 text-[11px]">
                    1. Open <strong>PayPal App</strong> or phone camera & scan QR code.
                  </p>
                  <p className="text-slate-600 text-[11px]">
                    2. Pay <strong>$19.00 USD</strong> for instant lifetime Pro license key activation.
                  </p>
                </div>
              </div>
            </div>
          )}

          {selectedMethod === 'wechat_alipay' && (
            <div className="space-y-1">
              <p className="font-bold text-white">Local / Custom Channel:</p>
              <p className="text-slate-400 text-[11px]">
                Redirect to your custom local payment landing page or payment QR code link.
              </p>
            </div>
          )}

          {selectedMethod === 'stripe' && (
            <div className="space-y-1">
              <p className="font-bold text-white">Stripe / Credit Card Integration:</p>
              <p className="text-slate-400 text-[11px]">
                Direct credit card processing supporting over 135+ global currencies.
              </p>
            </div>
          )}
        </div>

        {/* Free Sample Download Section */}
        <div className="mb-4 p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex flex-col gap-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-emerald-400 text-xs flex items-center gap-1.5">
              <Download className="w-4 h-4 text-emerald-400" />
              <span>卖家发货资产包下载 (Seller Digital Content Delivery Downloads):</span>
            </span>
            <span className="text-[10px] text-emerald-300/80 bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30">
              用于 Gumroad Content 上传
            </span>
          </div>
          <p className="text-slate-300 text-[11px]">
            点击下方按钮可直接将这 4 个准备好的发货文件下载到您的电脑本地，然后直接拖拽上传到 Gumroad 的 <strong>Content</strong> 选项卡中：
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            <a
              href="/api/download-file?filename=StoryCraft_Pro_Prompt_Vault.json"
              download="StoryCraft_Pro_Prompt_Vault.json"
              className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-[11px] flex items-center gap-1.5 transition-colors shadow"
            >
              <Download className="w-3.5 h-3.5" />
              <span>1. 1880+ 提示词库 (.json)</span>
            </a>
            <a
              href="/api/download-file?filename=StoryCraft_800_Master_Prompts.csv"
              download="StoryCraft_800_Master_Prompts.csv"
              className="px-3 py-1.5 rounded-lg bg-sky-700 hover:bg-sky-600 text-white font-bold text-[11px] flex items-center gap-1.5 transition-colors shadow"
            >
              <Download className="w-3.5 h-3.5" />
              <span>2. Excel/CSV 提示词表 (.csv)</span>
            </a>
            <a
              href="/api/download-file?filename=StoryCraft_Master_Workflow_Guide.md"
              download="StoryCraft_Master_Workflow_Guide.md"
              className="px-3 py-1.5 rounded-lg bg-indigo-700 hover:bg-indigo-600 text-white font-bold text-[11px] flex items-center gap-1.5 transition-colors shadow"
            >
              <Download className="w-3.5 h-3.5" />
              <span>3. AI 视频工作流指南 (.md)</span>
            </a>
            <a
              href="/api/download-file?filename=prompt-forge.html"
              download="prompt-forge.html"
              className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-[11px] flex items-center gap-1.5 transition-colors shadow"
            >
              <Download className="w-3.5 h-3.5" />
              <span>4. 离线 Prompt Web 工具 (.html)</span>
            </a>
          </div>
        </div>

        {/* Coupon input */}
        <form onSubmit={handleApplyCoupon} className="flex gap-2 mb-4">
          <input
            type="text"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            placeholder="Discount code (try CREATOR20)"
            className="flex-1 text-xs rounded-lg p-2.5 bg-slate-900 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
          />
          <button
            type="submit"
            className="px-4 py-2 text-xs font-bold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 transition-colors"
          >
            Apply
          </button>
        </form>

        {appliedDiscount && (
          <p className="text-xs text-emerald-400 font-bold mb-4">
            🎉 Discount Applied! 20% OFF applied to order.
          </p>
        )}

        {/* Price & Checkout Redirect Button */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div>
            <span className="text-xs text-slate-400">Total Price:</span>
            <div className="text-2xl font-black text-[#D4AF37]">{finalPrice}</div>
          </div>

          <a
            href={getActiveCheckoutUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 rounded-full text-xs font-black bg-[#D4AF37] hover:bg-amber-400 text-slate-950 transition-all shadow flex items-center space-x-2"
          >
            <span>
              {selectedMethod === 'paypal'
                ? 'PAY VIA PAYPAL'
                : selectedMethod === 'wechat_alipay'
                ? 'PAY VIA LOCAL STORE'
                : 'PROCEED TO CHECKOUT'}
            </span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
