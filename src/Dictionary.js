import React from "react";
import "./Dictionary.css";

const photos = [
  {
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=360&q=80",
    alt: "Sunset over a grassy field",
  },
  {
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=360&q=80",
    alt: "Pastel sunset over the ocean",
  },
  {
    src: "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?auto=format&fit=crop&w=360&q=80",
    alt: "Orange sunset along a country road",
  },
];

export default function Dictionary() {
  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <main className="Dictionary">
      <header className="Dictionary-header">
        <div className="Dictionary-book" aria-hidden="true">
          <span></span>
          <span></span>
        </div>
        <h1>Dictionary</h1>
      </header>

      <section className="Dictionary-searchSection" aria-label="Dictionary search">
        <p>What would you like to search?</p>
        <form className="Dictionary-search" onSubmit={handleSubmit}>
          <input type="search" aria-label="Search word" />
          <button type="submit">Search</button>
        </form>
      </section>

      <article className="Dictionary-entry">
        <h2>Sunset</h2>
        <p className="Dictionary-phonetic">&lt;IPA&gt;</p>

        <section className="Dictionary-definition">
          <h3>noun</h3>
          <p>The time in the evening when the sunlight fades...</p>
        </section>

        <section className="Dictionary-synonyms">
          <h3>synonyms</h3>
          <div>
            <span>nightfall.</span>
            <span>twilight</span>
            <span>dusk</span>
          </div>
        </section>

        <div className="Dictionary-photos">
          {photos.map((photo) => (
            <img src={photo.src} alt={photo.alt} key={photo.alt} />
          ))}
        </div>
      </article>
    </main>
  );
}
