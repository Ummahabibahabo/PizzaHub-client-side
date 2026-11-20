import {
  Check,
  Crown,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Pizza,
} from "lucide-react";

const SubscriptionPage = () => {
  const freeFeatures = [
    "Up to 3 active menu items",
    "Basic vendor dashboard",
    "Customer order management",
    "Manage your restaurant profile",
  ];

  const premiumFeatures = [
    "Unlimited active menu items",
    "Premium vendor badge",
    "Featured menu placement on homepage",
    "Full vendor dashboard access",
    "Customer order management",
    "Everything included in Free",
  ];

  return (
    <div className=" bg-[#FCFAF5] px-4 py-5 md:px-6 lg:px-8">
      <div>
        {/* Header */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="mb-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#A83B3B]">
              Your Pizzeria
            </p>

            <h1 className="text-2xl font-semibold text-[#29211E] md:text-3xl">
              Subscription
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Choose a plan that helps your restaurant grow.
            </p>
          </div>
        </div>

        {/* Intro Section */}
        <div className="mb-6 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#F5E5DE] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#A83B3B]">
            <Sparkles size={14} />
            Plans that rise with you
          </div>

          <h2 className="text-2xl font-semibold text-[#29211E] md:text-4xl">
            Make room for <span className="italic text-[#A83B3B]">more.</span>
          </h2>

          <p className="mx-auto mt-2 max-w-xl text-sm leading-5 text-gray-500">
            Whether you're just starting or ready to expand, we have the right
            plan for your pizzeria.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-5 md:grid-cols-2">
          {/* Free Plan */}
          <div className="flex flex-col rounded-2xl border border-[#E8DED4] bg-white p-5 shadow-sm md:p-6">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#A83B3B]">
                The Starter
              </span>

              <span className="rounded-full bg-[#F5E5DE] px-3 py-1 text-[10px] font-bold text-[#A83B3B]">
                CURRENT PLAN
              </span>
            </div>

            <div className="mb-1 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F9EDE7] text-[#A83B3B]">
                <Pizza size={21} />
              </div>

              <h3 className="text-xl font-semibold text-[#29211E]">Free</h3>
            </div>

            <div className="mb-1 mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-[#29211E]">$0</span>
              <span className="text-sm text-gray-400">/ forever</span>
            </div>

            <p className="mb-5 text-xs text-gray-500">
              Everything you need to get your pizza business started.
            </p>

            <div className="mb-5 border-t border-[#F0E8E2]" />

            <p className="mb-4 text-sm font-semibold text-[#29211E]">
              What's included
            </p>

            <ul className="flex-1 space-y-3">
              {freeFeatures.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2.5 text-[13px] text-[#665B55]"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#F5E5DE] text-[#A83B3B]">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>

            <button className="mt-6 w-full rounded-xl border border-[#DED2C9] py-2.5 text-sm font-semibold text-[#51443E]">
              Your Current Plan
            </button>
          </div>

          {/* Premium Plan */}
          <div className="relative flex flex-col overflow-hidden rounded-2xl border border-[#A83B3B] bg-[#A83B3B] p-5 text-white shadow-lg shadow-[#A83B3B]/10 md:p-6">
            {/* Popular Badge */}
            <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-[#F5D5C8] px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-wide text-[#8E3434]">
              <Sparkles size={11} />
              Most Popular
            </div>

            <div className="mb-4">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#F2C4B5]">
                The Full Oven
              </span>
            </div>

            <div className="mb-1 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-[#FFD7C8]">
                <Crown size={21} />
              </div>

              <h3 className="text-xl font-semibold">Premium</h3>
            </div>

            <div className="mb-1 mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-bold">$19</span>
              <span className="text-sm text-[#F2C4B5]">/ month</span>
            </div>

            <p className="mb-5 text-xs leading-5 text-[#F3D7CE]">
              Take your restaurant to the next level with premium features and
              unlimited possibilities.
            </p>

            <div className="mb-5 border-t border-white/20" />

            <p className="mb-4 text-sm font-semibold">
              Everything in Free, plus
            </p>

            <ul className="flex-1 space-y-3">
              {premiumFeatures.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2.5 text-[13px] text-[#F9E7E0]"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/15 text-[#FFD7C8]">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>

            <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#E8B2A4] py-2.5 text-sm font-bold text-[#762E2E] transition hover:bg-[#F1C5B8]">
              Upgrade to Premium
              <ArrowRight size={16} />
            </button>

            <p className="mt-3 text-center text-[11px] text-[#F2C4B5]">
              Secure payment powered by Stripe.
            </p>
          </div>
        </div>

        {/* Bottom Information */}
        <div className="mx-auto mt-6 flex max-w-4xl flex-col items-center justify-between gap-3 rounded-2xl border border-[#E8DED4] bg-white p-4 sm:flex-row">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F9EDE7] text-[#A83B3B]">
              <ShieldCheck size={22} />
            </div>

            <div>
              <h4 className="text-sm font-semibold text-[#29211E]">
                Simple and secure subscription
              </h4>

              <p className="mt-1 text-xs text-gray-500">
                Your payment is processed securely through Stripe.
              </p>
            </div>
          </div>

          <div className="text-xs font-medium text-[#A83B3B]">
            Made for the neighborhood.
          </div>
        </div>

        {/* Footer */}
        <p className="mt-5 text-center text-xs text-gray-400">
          © 2026 PizzaHub. Fresh pizza, bigger opportunities.
        </p>
      </div>
    </div>
  );
};

export default SubscriptionPage;
