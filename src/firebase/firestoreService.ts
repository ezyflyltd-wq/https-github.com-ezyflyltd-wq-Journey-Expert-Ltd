import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  Unsubscribe,
} from 'firebase/firestore';
import { db, auth, handleFirestoreError, OperationType } from './config';
import {
  UserProfile,
  FirestoreBooking,
  FirestoreVisaApplication,
  FirestoreInquiry,
  FirestoreSupportTicket,
  FirestoreWalletTransaction,
} from '../types';

// ============================================================================
// USER PROFILE OPERATIONS
// ============================================================================

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const path = `users/${userId}`;
  try {
    const docRef = doc(db, 'users', userId);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return snap.data() as UserProfile;
    }
    return null;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
  }
}

export async function saveUserProfile(profile: UserProfile): Promise<void> {
  const path = `users/${profile.userId}`;
  try {
    const docRef = doc(db, 'users', profile.userId);
    await setDoc(docRef, {
      ...profile,
      updatedAt: new Date().toISOString(),
    }, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

// ============================================================================
// BOOKINGS OPERATIONS
// ============================================================================

export async function createBooking(booking: FirestoreBooking): Promise<void> {
  const path = `bookings/${booking.bookingId}`;
  try {
    const docRef = doc(db, 'bookings', booking.bookingId);
    await setDoc(docRef, {
      ...booking,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export function subscribeUserBookings(
  userId: string,
  onUpdate: (bookings: FirestoreBooking[]) => void
): Unsubscribe {
  const path = 'bookings';
  try {
    const q = query(
      collection(db, 'bookings'),
      where('userId', '==', userId)
    );

    return onSnapshot(
      q,
      (snapshot) => {
        const bookings: FirestoreBooking[] = [];
        snapshot.forEach((docSnap) => {
          bookings.push(docSnap.data() as FirestoreBooking);
        });
        onUpdate(bookings);
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, path);
      }
    );
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
  }
}

export async function cancelBooking(bookingId: string): Promise<void> {
  const path = `bookings/${bookingId}`;
  try {
    const docRef = doc(db, 'bookings', bookingId);
    await updateDoc(docRef, {
      status: 'Cancelled',
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

// ============================================================================
// VISA APPLICATIONS OPERATIONS
// ============================================================================

export async function submitVisaApplication(
  application: FirestoreVisaApplication
): Promise<void> {
  const path = `visa_applications/${application.applicationId}`;
  try {
    const docRef = doc(db, 'visa_applications', application.applicationId);
    await setDoc(docRef, {
      ...application,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export function subscribeUserVisaApplications(
  userId: string,
  onUpdate: (apps: FirestoreVisaApplication[]) => void
): Unsubscribe {
  const path = 'visa_applications';
  try {
    const q = query(
      collection(db, 'visa_applications'),
      where('userId', '==', userId)
    );

    return onSnapshot(
      q,
      (snapshot) => {
        const apps: FirestoreVisaApplication[] = [];
        snapshot.forEach((docSnap) => {
          apps.push(docSnap.data() as FirestoreVisaApplication);
        });
        onUpdate(apps);
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, path);
      }
    );
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
  }
}

// ============================================================================
// INQUIRIES & LEAD OPERATIONS
// ============================================================================

export async function submitInquiry(inquiry: FirestoreInquiry): Promise<void> {
  const path = `inquiries/${inquiry.inquiryId}`;
  try {
    const docRef = doc(db, 'inquiries', inquiry.inquiryId);
    await setDoc(docRef, {
      ...inquiry,
      createdAt: new Date().toISOString(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

// ============================================================================
// SUPPORT TICKETS OPERATIONS
// ============================================================================

export async function createSupportTicket(
  ticket: FirestoreSupportTicket
): Promise<void> {
  const path = `support_tickets/${ticket.ticketId}`;
  try {
    const docRef = doc(db, 'support_tickets', ticket.ticketId);
    await setDoc(docRef, {
      ...ticket,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export function subscribeUserSupportTickets(
  userId: string,
  onUpdate: (tickets: FirestoreSupportTicket[]) => void
): Unsubscribe {
  const path = 'support_tickets';
  try {
    const q = query(
      collection(db, 'support_tickets'),
      where('userId', '==', userId)
    );

    return onSnapshot(
      q,
      (snapshot) => {
        const tickets: FirestoreSupportTicket[] = [];
        snapshot.forEach((docSnap) => {
          tickets.push(docSnap.data() as FirestoreSupportTicket);
        });
        onUpdate(tickets);
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, path);
      }
    );
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
  }
}

// ============================================================================
// WALLET TRANSACTIONS & BALANCE
// ============================================================================

export async function addWalletTransaction(
  txn: FirestoreWalletTransaction,
  newBalanceBDT?: number
): Promise<void> {
  const path = `wallet_transactions/${txn.transactionId}`;
  try {
    const docRef = doc(db, 'wallet_transactions', txn.transactionId);
    await setDoc(docRef, {
      ...txn,
      createdAt: new Date().toISOString(),
    });

    if (newBalanceBDT !== undefined && auth.currentUser) {
      const userRef = doc(db, 'users', auth.currentUser.uid);
      await updateDoc(userRef, {
        walletBalanceBDT: newBalanceBDT,
        updatedAt: new Date().toISOString(),
      });
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export function subscribeUserWalletTransactions(
  userId: string,
  onUpdate: (transactions: FirestoreWalletTransaction[]) => void
): Unsubscribe {
  const path = 'wallet_transactions';
  try {
    const q = query(
      collection(db, 'wallet_transactions'),
      where('userId', '==', userId)
    );

    return onSnapshot(
      q,
      (snapshot) => {
        const txns: FirestoreWalletTransaction[] = [];
        snapshot.forEach((docSnap) => {
          txns.push(docSnap.data() as FirestoreWalletTransaction);
        });
        onUpdate(txns);
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, path);
      }
    );
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
  }
}
