// Generador de RNDs con 16 decimales (causa error en log(1-RND) si posee más de 16 decimales)
function generarRND() {
    return parseFloat(Math.random().toFixed(16));
}

// Generador (Clase base)
class GeneradorVariablesAleatorias {
    // Método abstracto
    generar() {
        throw new Error("Método 'generar' debe ser implementado por subclases");
    }
}

// Generador Uniforme(A, B)

class GeneradorUniforme extends GeneradorVariablesAleatorias {
  constructor(a, b) {
    super();
    this.a = a;
    this.b = b;
  }

  generar(rnd) {
    return [this.a + (this.b - this.a) * rnd];
  }
}

// Geneador Exponencial(lambda)

class GeneradorExponencial extends GeneradorVariablesAleatorias {
  constructor(lambda) {
    super();
    this.lambda = lambda;
  }

  generar(rnd) {
    return [-Math.log(1 - rnd) / this.lambda];
  }
}

// Generador Normal(mu, sigma)
class GeneradorNormal extends GeneradorVariablesAleatorias {
  constructor(mu, sigma) {
    super();
    this.mu = mu;
    this.sigma = sigma;
  }

  // Método de Box-Muller para generar dos números normales a partir de dos números aleatorios uniformes
  generar(rnd1, rnd2) {
    const z0 =
      Math.sqrt(-2.0 * Math.log(1 -rnd1)) * Math.cos(2.0 * Math.PI * rnd2);
    const z1 =
      Math.sqrt(-2.0 * Math.log(1- rnd1)) * Math.sin(2.0 * Math.PI * rnd2);
    return [this.mu + z0 * this.sigma, this.mu + z1 * this.sigma];
  }
}

export { GeneradorUniforme, GeneradorExponencial, GeneradorNormal, generarRND };