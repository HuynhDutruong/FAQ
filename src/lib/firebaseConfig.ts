/**
 * Chỉ chứa cấu hình, KHÔNG import SDK. Tách riêng để các component nạp
 * Firebase động (ví dụ FirebaseAnalytics) không kéo cả SDK vào bundle khởi động.
 */
export const firebaseConfig = {
  apiKey: "AIzaSyADDC3-1BYxJX5hs-ofxUmM9lHiXbmk3zo",
  authDomain: "faqfeedback-d3653.firebaseapp.com",
  databaseURL: "https://faqfeedback-d3653-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "faqfeedback-d3653",
  storageBucket: "faqfeedback-d3653.firebasestorage.app",
  messagingSenderId: "291729919545",
  appId: "1:291729919545:web:10c3aed11820ab5085c7e8",
  measurementId: "G-MTJNE29GKB"
};
