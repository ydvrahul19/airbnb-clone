"use client";

import { useState } from "react";
import listingData from "@/data/listing.json";
import { Listing } from "@/lib/types";
import { nightsBetween, priceForNights, freeCancellationDateLabel } from "@/lib/dates";

import Header from "@/components/Header";
import PhotoGrid from "@/components/PhotoGrid";
import TitleBar from "@/components/TitleBar";
import StickyNav from "@/components/StickyNav";
import Overview from "@/components/Overview";
import HostCard from "@/components/HostCard";
import Highlights from "@/components/Highlights";
import Description from "@/components/Description";
import WhereYoullSleep from "@/components/WhereYoullSleep";
import Amenities from "@/components/Amenities";
import TripDates from "@/components/TripDates";
import BookingSidebar from "@/components/BookingSidebar";
import Reviews from "@/components/Reviews";
import LocationMap from "@/components/LocationMap";
import HostDetail from "@/components/HostDetail";
import ThingsToKnow from "@/components/ThingsToKnow";
import NearbyStays from "@/components/NearbyStays";
import PhotoTour from "@/components/PhotoTour";
import Lightbox from "@/components/Lightbox";

const listing = listingData as Listing;

// Flatten photo tour into a single ordered list of {src, roomLabel} for the lightbox
const flatLightboxImages = listing.photoTour.flatMap((group) =>
  group.images.map((src) => ({ src, roomLabel: group.roomLabel }))
);

// Grid hero images = first image of first N groups (for the top photo grid)
const heroGridImages = listing.photoTour.flatMap((g) => g.images);

const pricePerNight = listing.pricing.pricePerFive / listing.pricing.nights;

export default function Home() {
  const [tourOpen, setTourOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Trip dates are shared between the in-page calendar (TripDates) and the
  // booking sidebar's calendar popover, so picking a date in either place
  // updates both, along with the derived nights/price/free-cancellation text.
  const [checkIn, setCheckIn] = useState<Date | null>(
    new Date(listing.pricing.checkIn)
  );
  const [checkOut, setCheckOut] = useState<Date | null>(
    new Date(listing.pricing.checkOut)
  );

  const handleDatesChange = (ci: Date | null, co: Date | null) => {
    setCheckIn(ci);
    setCheckOut(co);
  };

  const nights = nightsBetween(checkIn, checkOut, listing.pricing.nights);
  const price = priceForNights(pricePerNight, nights);
  const freeCancellationDate = freeCancellationDateLabel(
    checkIn,
    listing.pricing.freeCancellationDate
  );

  const openLightboxFromGrid = (index: number) => {
    setLightboxIndex(index % flatLightboxImages.length);
    setLightboxOpen(true);
  };

  const openLightboxFromTour = (flatIndex: number) => {
    setLightboxIndex(flatIndex);
    setLightboxOpen(true);
  };

  const handleReserve = () => {
    alert("This is a UI clone for a take-home task — booking is not implemented.");
  };

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Header />

      <main id="main-content" className="flex-1">
        <div className="max-w-[1120px] mx-auto px-6 lg:px-0">
          <TitleBar title={listing.title} />
          <PhotoGrid
            images={heroGridImages}
            title={listing.title}
            onOpenTour={() => setTourOpen(true)}
            onOpenLightbox={openLightboxFromGrid}
          />
        </div>

        <div id="photos" className="scroll-mt-24" />

        <StickyNav
          price={price}
          currency={listing.pricing.currency}
          nights={nights}
          rating={listing.rating}
          reviewCount={listing.reviewCount}
          onReserve={handleReserve}
        />

        <div className="max-w-[1120px] mx-auto px-6 lg:px-0 grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left column */}
          <div className="lg:col-span-2">
            <Overview
              propertyType={listing.propertyType}
              guests={listing.guests}
              bedrooms={listing.bedrooms}
              beds={listing.beds}
              bathrooms={listing.bathrooms}
              isGuestFavourite={listing.isGuestFavourite}
              guestFavouriteText={listing.guestFavouriteText}
              rating={listing.rating}
              reviewCount={listing.reviewCount}
            />
            <HostCard name={listing.host.name} yearsHosting={listing.host.yearsHosting} />
            <Highlights highlights={listing.highlights} />
            <Description text={listing.description} />
            <WhereYoullSleep
              bedroom={listing.rooms.bedroom}
              livingRoom={listing.rooms.livingRoom}
            />
            <div id="amenities" className="scroll-mt-24">
              <Amenities amenities={listing.amenities} total={listing.amenitiesTotal} />
            </div>
          </div>

          {/* Right column - booking sidebar */}
          <div className="lg:col-span-1">
            <BookingSidebar
              currency={listing.pricing.currency}
              price={price}
              nights={nights}
              checkIn={checkIn}
              checkOut={checkOut}
              onDatesChange={handleDatesChange}
              initialGuests={listing.pricing.guests}
              freeCancellationDate={freeCancellationDate}
              discountText={listing.pricing.discountText}
              onReserve={handleReserve}
            />
          </div>
        </div>

        <div className="max-w-[1120px] mx-auto px-6 lg:px-0">
          <TripDates
            nights={nights}
            area={listing.location.area}
            checkIn={checkIn}
            checkOut={checkOut}
            onDatesChange={handleDatesChange}
          />
          <Reviews
            rating={listing.rating}
            reviewCount={listing.reviewCount}
            categories={listing.reviewCategories}
            tags={listing.reviewTags}
            reviews={listing.reviews}
          />
          <LocationMap
            area={listing.location.area}
            neighbourhood={listing.location.neighbourhood}
          />
          <HostDetail
            name={listing.host.name}
            totalReviews={listing.host.totalReviews}
            rating={listing.host.rating}
            yearsHosting={listing.host.yearsHosting}
            isVerified={listing.host.isVerified}
            bio={listing.host.bio}
            cohosts={listing.host.cohosts}
            responseRate={listing.host.responseRate}
            responseTime={listing.host.responseTime}
          />
          <ThingsToKnow
            freeCancellationDate={freeCancellationDate}
            houseRules={listing.houseRules}
            safety={listing.safety}
          />
          <NearbyStays stays={listing.nearbyStays} currency={listing.pricing.currency} />
        </div>
      </main>

      {tourOpen && (
        <PhotoTour
          title={listing.title}
          groups={listing.photoTour}
          onClose={() => setTourOpen(false)}
          onOpenLightbox={(flatIndex) => {
            setTourOpen(false);
            openLightboxFromTour(flatIndex);
          }}
        />
      )}

      {lightboxOpen && (
        <Lightbox
          images={flatLightboxImages}
          currentIndex={lightboxIndex}
          onIndexChange={setLightboxIndex}
          onClose={() => setLightboxOpen(false)}
          onOpenGrid={() => {
            setLightboxOpen(false);
            setTourOpen(true);
          }}
        />
      )}
    </>
  );
}
