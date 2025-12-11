import { Country } from "../models/country-model";

export function explainSimilarity(a: Country, b: Country): string {
    const reasons = [];

    if (a.region === b.region)
        reasons.push(`Ambos pertenecen a la región ${a.region}`);

    if (Math.abs(a.population - b.population) < 10_000_000)
        reasons.push("Tienen poblaciones similares");

    if (Math.abs(a.area - b.area) < 100_000)
        reasons.push("Tamaños de territorio parecidos");

    const langsA = Object.keys(a.languages ?? {}).length;
    const langsB = Object.keys(b.languages ?? {}).length;
    if (langsA === langsB)
        reasons.push("Cantidad similar de idiomas oficiales");

    return reasons.length
        ? reasons.join(", ")
        : "La similitud se basa en métricas numéricas.";
}
