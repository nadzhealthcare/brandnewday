import BookingForm from "./BookingForm";

/* The in-hero booking bar. The sticky-on-scroll copy is handled globally by
   <StickyBooking/> (mounted in the layout); the data attribute below lets it
   know when this anchor has scrolled out of view. */
export default function BookingBar() {
  return (
    <div data-booking-anchor className="w-full">
      <BookingForm />
    </div>
  );
}
