import React, { useState } from "react";
import "./Dictionary.css";

const apiKey = "0232oa2bd084ect6f17c5fee93b97744";

const initialEntry = {
  word: "Hello",
  phonetics: ["/həˈləʊ/", "/hɛˈləʊ/"],
  meanings: [
    {
      partOfSpeech: "exclamation",
      definitions: [
        {
          definition: "Used as a greeting or to begin a phone conversation.",
          example: "Hello, how are you?",
          synonyms: ["hi", "greetings", "hey"],
        },
      ],
      synonyms: ["hi", "greetings", "hey"],
    },
  ],
};

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

function formatEntry(result) {
  if (!result.meanings || result.meanings.length === 0) {
    throw new Error("Word not found.");
  }

  const phonetics = [
    result.phonetic,
    ...(result.phonetics || []).map((phonetic) => phonetic.text),
  ].filter(Boolean);
  const meanings = (result.meanings || []).map((meaning) => ({
    partOfSpeech: meaning.partOfSpeech || "definition",
    definitions: (meaning.definitions || [
      {
        definition: meaning.definition,
        example: meaning.example,
        synonyms: meaning.synonyms,
      },
    ]).map((definition) => ({
      definition: definition.definition || "No definition available.",
      example: definition.example,
      synonyms: definition.synonyms || [],
    })),
    synonyms: meaning.synonyms || [],
  }));

  return {
    word: result.word || "Unknown",
    phonetics:
      [...new Set(phonetics)].length > 0 ? [...new Set(phonetics)] : ["<IPA>"],
    meanings:
      meanings.length > 0
        ? meanings
        : [
            {
              partOfSpeech: "definition",
              definitions: [{ definition: "No definition available." }],
              synonyms: [],
            },
          ],
  };
}

export default function Dictionary() {
  const [keyword, setKeyword] = useState("hello");
  const [entry, setEntry] = useState(initialEntry);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    const word = keyword.trim();

    if (!word) {
      setError("Please enter a word to search.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://api.shecodes.io/dictionary/v1/define?word=${encodeURIComponent(
          word
        )}&key=${apiKey}`
      );

      if (!response.ok) {
        throw new Error("Word not found.");
      }

      const result = await response.json();
      setEntry(formatEntry(result));
    } catch (error) {
      setError(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
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
          <input
            type="search"
            aria-label="Search word"
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Searching" : "Search"}
          </button>
        </form>
        {error && <p className="Dictionary-error">{error}</p>}
      </section>

      <article className="Dictionary-entry">
        <h2>{entry.word}</h2>
        <div className="Dictionary-phonetics" aria-label="Phonetics">
          {entry.phonetics.map((phonetic) => (
            <span key={phonetic}>{phonetic}</span>
          ))}
        </div>

        <div className="Dictionary-meanings">
          {entry.meanings.map((meaning, meaningIndex) => {
            const synonyms = [
              ...new Set([
                ...meaning.synonyms,
                ...meaning.definitions.flatMap(
                  (definition) => definition.synonyms
                ),
              ]),
            ];

            return (
              <section
                className="Dictionary-meaning"
                key={`${entry.word}-${meaning.partOfSpeech}-${meaningIndex}`}
              >
                <h3>{meaning.partOfSpeech}</h3>

                <ol className="Dictionary-definitions">
                  {meaning.definitions.map((definition, index) => (
                    <li key={`${meaning.partOfSpeech}-${index}`}>
                      <p>{definition.definition}</p>
                      {definition.example && (
                        <p className="Dictionary-example">
                          Example: {definition.example}
                        </p>
                      )}
                    </li>
                  ))}
                </ol>

                {synonyms.length > 0 && (
                  <section className="Dictionary-synonyms">
                    <h4>synonyms</h4>
                    <div>
                      {synonyms.slice(0, 6).map((synonym) => (
                        <span key={synonym}>{synonym}</span>
                      ))}
                    </div>
                  </section>
                )}
              </section>
            );
          })}
        </div>

        <div className="Dictionary-photos">
          {photos.map((photo) => (
            <img src={photo.src} alt={photo.alt} key={photo.alt} />
          ))}
        </div>
      </article>
    </main>
  );
}
