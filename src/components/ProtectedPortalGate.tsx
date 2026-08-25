import type { ReactNode } from 'react';
import { LockKeyhole, LogIn, ShieldAlert } from 'lucide-react';
import { useAuth } from '../firebase/authContext';
import type { UserProfile } from '../types';

type ProtectedPortalGateProps = {
  title: string;
  description: string;
  allowedRoles?: UserProfile['role'][];
  children: ReactNode;
};

export function ProtectedPortalGate({
  title,
  description,
  allowedRoles,
  children,
}: ProtectedPortalGateProps) {
  const { user, userProfile, loading, signInWithGoogle } = useAuth();

  if (loading) {
    return (
      <section className="mx-auto flex min-h-[420px] max-w-3xl items-center justify-center px-6 py-16" aria-live="polite">
        <p className="text-sm font-semibold text-[#52615B]">Checking your Journey Expert access…</p>
      </section>
    );
  }

  if (!user) {
    return (
      <section className="mx-auto flex min-h-[420px] max-w-3xl items-center justify-center px-6 py-16">
        <div className="w-full rounded-3xl border border-[#DCE9E1] bg-white p-8 text-center shadow-sm sm:p-12">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EAF5EF] text-[#0B6B53]">
            <LockKeyhole className="h-7 w-7" aria-hidden="true" />
          </div>
          <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-[#C7A44D]">Protected workspace</p>
          <h1 className="font-serif text-3xl font-black text-[#093F31]">{title}</h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#52615B]">{description}</p>
          <button
            type="button"
            onClick={() => void signInWithGoogle()}
            className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-[#093F31] px-5 py-3 text-sm font-black text-white shadow-md transition hover:bg-[#0B6B53]"
          >
            <LogIn className="h-4 w-4" aria-hidden="true" />
            Sign in with Google
          </button>
        </div>
      </section>
    );
  }

  const roleAllowed = !allowedRoles || (userProfile && allowedRoles.includes(userProfile.role));
  if (!roleAllowed) {
    return (
      <section className="mx-auto flex min-h-[420px] max-w-3xl items-center justify-center px-6 py-16">
        <div className="w-full rounded-3xl border border-amber-200 bg-amber-50 p-8 text-center shadow-sm sm:p-12">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
            <ShieldAlert className="h-7 w-7" aria-hidden="true" />
          </div>
          <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-amber-700">Access not granted</p>
          <h1 className="font-serif text-3xl font-black text-[#093F31]">{title}</h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#52615B]">
            Your signed-in Journey Expert profile does not have the role required for this workspace. No private records were loaded.
          </p>
        </div>
      </section>
    );
  }

  return <>{children}</>;
}
