import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";

export async function interactuarConCorreoArgentino(codigo) {
  let browser;

  try {
    browser = await puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    });

    const page = await browser.newPage();

    // Logs útiles en Render
    page.on("console", (msg) => console.log("PAGE LOG:", msg.text()));
    page.on("pageerror", (err) => console.error("PAGE ERROR:", err));

    // User agent para evitar bloqueos simples
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36"
    );

    await page.setViewport({ width: 1080, height: 1024 });

    await page.goto(
      "https://www.correoargentino.com.ar/formularios/e-commerce",
      { waitUntil: "networkidle2", timeout: 30000 }
    );

    // Esperar input y completar
    await page.waitForSelector("input", { timeout: 15000 });
    await page.type("input", codigo, { delay: 50 });

    await new Promise((resolve) => setTimeout(resolve, 1000)); // pequeña pausa humana

    // Click + esperar respuesta real
    await Promise.all([
      page.click("button"),
      page.waitForResponse((res) => res.url().includes("correoargentino"), {
        timeout: 30000,
      }),
    ]);

    // Esperar tabla, pero sin colgarse para siempre
    const tablaExiste = await page
      .waitForSelector("table", {
        timeout: 1000,
      })
      .catch(() => null);

    if (!tablaExiste) {
      return {
        error: "No se encontró información o el sitio no respondió",
      };
    }

    // Extraer datos
    const result = await page.evaluate(() => {
      const tabla = document.querySelector("table");
      if (!tabla) return {};

      const headers = Array.from(tabla.querySelectorAll("thead th")).map((th) =>
        th.innerText.trim()
      );

      const values = Array.from(
        tabla.querySelectorAll("tbody tr:first-child td")
      );

      const data = {};
      headers.forEach((header, index) => {
        data[header] = values[index]?.innerText.trim() || "";
      });

      return data;
    });

    return result;
  } catch (error) {
    console.error("Error en Puppeteer:", error);
    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
