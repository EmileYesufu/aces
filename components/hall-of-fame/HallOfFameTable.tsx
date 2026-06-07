"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  hallOfFame,
  hallOfFameYears,
  getYearGalleryPhotos,
  hasLabeledPhotos,
} from "@/content/hall-of-fame";
import { HallOfFameGallery } from "@/components/hall-of-fame/HallOfFameGallery";
import { Search, Trophy, Medal } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

function isGirls(ageGroup: string) {
  return ageGroup.toLowerCase().includes("girl") || ageGroup.toLowerCase().includes("gu");
}

export function HallOfFameTable() {
  const [selectedYear, setSelectedYear] = useState(hallOfFameYears[0]);
  const [search, setSearch] = useState("");

  const yearData = hallOfFame.find((y) => y.year === selectedYear);
  const latestYear = hallOfFameYears[0];
  const labeled = hasLabeledPhotos(selectedYear);
  const yearPhotos = getYearGalleryPhotos(selectedYear);

  const winners = useMemo(() => {
    if (!yearData) return [];
    if (!search.trim()) return yearData.winners;
    const q = search.toLowerCase();
    return yearData.winners.filter(
      (w) =>
        w.team.toLowerCase().includes(q) ||
        w.town.toLowerCase().includes(q) ||
        w.ageGroup.toLowerCase().includes(q)
    );
  }, [yearData, search]);

  const showGallery =
    !search.trim() &&
    (labeled ? winners.some((w) => w.photo) : yearPhotos.length > 0);

  return (
    <div>
      {selectedYear === latestYear && yearData && (
        <ScrollReveal>
          <div className="mb-8 rounded-xl bg-gradient-to-r from-aces-navy to-aces-navy-light p-6 text-white md:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-aces-red">
                <Trophy className="h-7 w-7" />
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold uppercase md:text-3xl">
                  {latestYear} National Champions
                </h2>
                <p className="mt-2 text-gray-300">
                  {yearData.winners.length} age groups crowned at the {latestYear} ACES Nationals
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      )}

      <div className="mb-8 flex flex-col gap-4">
        <div className="relative sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" aria-hidden="true" />
          <label htmlFor="hof-search" className="sr-only">
            Search the Hall of Fame
          </label>
          <input
            id="hof-search"
            type="search"
            placeholder="Search team, town, age group..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-aces-red focus:outline-none focus:ring-1 focus:ring-aces-red"
          />
        </div>
        <div
          className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 scrollbar-thin sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0"
          role="group"
          aria-label="Select a tournament year"
        >
          {hallOfFameYears.map((year) => (
            <button
              key={year}
              type="button"
              onClick={() => setSelectedYear(year)}
              aria-pressed={selectedYear === year}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aces-red ${
                selectedYear === year
                  ? "bg-aces-red text-white shadow-md"
                  : "bg-gray-100 text-aces-navy hover:bg-gray-200"
              }`}
            >
              {year}
            </button>
          ))}
        </div>
      </div>

      {showGallery && yearData && (
        <HallOfFameGallery
          year={selectedYear}
          winners={yearData.winners}
          photos={yearPhotos}
          labeled={labeled}
        />
      )}

      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-aces-navy text-white">
            <tr>
              {labeled && (
                <th scope="col" className="w-16 px-4 py-3 text-left text-sm font-semibold">
                  <span className="sr-only">Photo</span>
                </th>
              )}
              <th scope="col" className="px-6 py-3 text-left text-sm font-semibold">
                Age Group
              </th>
              <th scope="col" className="px-6 py-3 text-left text-sm font-semibold">
                Team
              </th>
              <th scope="col" className="px-6 py-3 text-left text-sm font-semibold">
                Town
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {winners.length === 0 ? (
              <tr>
                <td colSpan={labeled ? 4 : 3} className="px-6 py-8 text-center text-aces-muted">
                  No winners found for this search.
                </td>
              </tr>
            ) : (
              winners.map((winner) => (
                <tr
                  key={`${winner.ageGroup}-${winner.team}`}
                  className={`transition-colors hover:bg-gray-50 ${
                    selectedYear === latestYear ? "hover:bg-aces-red/5" : ""
                  }`}
                >
                  {labeled && (
                    <td className="px-4 py-3">
                      {winner.photo ? (
                        <div className="relative h-12 w-12 overflow-hidden rounded-lg bg-gray-100">
                          <Image
                            src={winner.photo}
                            alt=""
                            fill
                            className="object-cover"
                            sizes="48px"
                          />
                        </div>
                      ) : (
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100">
                          <Medal className="h-5 w-5 text-gray-300" aria-hidden="true" />
                        </div>
                      )}
                    </td>
                  )}
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-aces-navy">
                    <span className="flex items-center gap-2">
                      <Medal
                        className={`h-4 w-4 shrink-0 ${
                          isGirls(winner.ageGroup) ? "text-aces-red" : "text-aces-navy"
                        }`}
                      />
                      {winner.ageGroup}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-aces-navy">{winner.team}</td>
                  <td className="px-6 py-4 text-sm text-aces-muted">{winner.town}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
