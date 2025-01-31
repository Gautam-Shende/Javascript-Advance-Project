
document.addEventListener("DOMContentLoaded", () => {
    const fromCurrency = document.getElementById("fromCurrency");
    const toCurrency = document.getElementById("toCurrency");
    const amountInput = document.getElementById("amount");
    const resultValue = document.getElementById("resultValue");
    const convertButton = document.getElementById("convertButton");
    const fromFlag = document.getElementById("fromFlag");
    const toFlag = document.getElementById("toFlag");

    async function loadCurrencies() {
        const response = await fetch("https://restcountries.com/v3.1/region/asia");
        const countries = await response.json();

        countries.forEach((country) => {
            const currencyCode = Object.keys(country.currencies)[0];
            const optionFrom = document.createElement("option");
            const optionTo = document.createElement("option");

            optionFrom.value = currencyCode;
            optionFrom.textContent = `${currencyCode} - ${country.name.common}`;
            optionTo.value = currencyCode;
            optionTo.textContent = `${currencyCode} - ${country.name.common}`;

            fromCurrency.appendChild(optionFrom);
            toCurrency.appendChild(optionTo);
        });

        updateFlags();
    }

    async function updateFlags() {
        const fromCountryCode = fromCurrency.value;
        const toCountryCode = toCurrency.value;

        const fromCountry = await getCountryByCurrency(fromCountryCode);
        const toCountry = await getCountryByCurrency(toCountryCode);

        if (fromCountry) {
            fromFlag.src = fromCountry.flags.png;
        }
        if (toCountry) {
            toFlag.src = toCountry.flags.png;
        }
    }

    async function getCountryByCurrency(currencyCode) {
        const response = await fetch(`https://restcountries.com/v3.1/currency/${currencyCode}`);
        const countryData = await response.json();
        return countryData.length ? countryData[0] : null;
    }

    fromCurrency.addEventListener("change", updateFlags);
    toCurrency.addEventListener("change", updateFlags);

    convertButton.addEventListener("click", async () => {
        const amount = parseFloat(amountInput.value);
        const from = fromCurrency.value;
        const to = toCurrency.value;

        if (!isNaN(amount)) {
            const conversionRate = await getConversionRate(from, to);
            const result = amount * conversionRate;
            resultValue.textContent = result.toFixed(2);
        } else {
            resultValue.textContent = "0.00";
        }
    });

    async function getConversionRate(from, to) {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
        const data = await response.json();
        return data.rates[to];
    }

    loadCurrencies();
});
