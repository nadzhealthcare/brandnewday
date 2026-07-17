/* Curated Google reviews for the "Loved by Families Across Dubai" section.

   Testimonials are CMS-driven, but the Strapi API is read-only from the site,
   so real Google reviews are kept here. Anything added in Strapi shows first
   and these top up the remaining slots (see ReviewsTile).

   Only genuine reviews belong in this list, patients are shown them as real.
   Quotes are kept verbatim, and `time` says "Verified patient" when the date
   isn't known rather than inventing one. */

export type CuratedReview = {
  name: string;
  initials: string;
  text: string;
  time: string;
};

/** The long-form quote in the highlight tile. A testimonial ticked `featured`
    in Strapi overrides it. */
export const FEATURED_GOOGLE_REVIEW = {
  name: "Анастасия Гурская",
  initials: "АГ",
  label: "Verified Google review",
  text: "I want to say big thank you to Nurse Chandra and Physiotherapist Dr Ahsan! They came to me at 9pm even after the shift for them was over only because I had very bad pain in my back! They did amazing job and now finally I feel much better! Also thank u for Mahmoud that I assisted me on the phone",
};

export const GOOGLE_REVIEWS: CuratedReview[] = [
  {
    name: "Анастасия Гурская",
    initials: "АГ",
    text: FEATURED_GOOGLE_REVIEW.text,
    time: "Verified patient",
  },
  {
    name: "Eoin McLaughlin",
    initials: "EM",
    text: "Dr Ahsan physiotherapist- I was very impressed with the work he done on very first session. Would definitely recommend.",
    time: "Verified patient",
  },
  {
    name: "Harriet Adomah",
    initials: "HA",
    text: "I recently had a blood test at home and their nurses reached within 20mins for home blood collection, I also received the results on time as i expected it, would absolutely recommend!!",
    time: "Verified patient",
  },
  {
    name: "Ruwan Ranjith Fernando",
    initials: "RF",
    text: "Overall service was superb. Contact person was very supportive and nursing staff also very experienced.",
    time: "6 months ago",
  },
  {
    name: "VA Refurbished",
    initials: "VA",
    text: "Amazed by Dr. Jerusalem and her team, they took our baby's illness very seriously and kept checking in.",
    time: "8 months ago",
  },
];
