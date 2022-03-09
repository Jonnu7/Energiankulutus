/**1. Vaihdan var-muuttujat let-muuttujiksi, jotta ei tarvitsisi miettiä muuttaako esimerkiksi jokin for-looppi tai toinen funktio vahingossa muuttujan toiseksi tahattomasti. 
 * Esimerkiksi for (let i in dogs) {.
 * 
 * 2. Riippuen kuinka hyvin muuttujat classien sisällä halutaan pitää yksityisinä, #-merkintä voisi sopia paremmin kuin private.
 * Privateihin pääsee käsiksi nopeammin, mutta #-merkittyinä ne ainakin olisivat yksityisiä.
 * Näin ne pysyisivät classin sisällä varmasti sekä compilerissä että runtimessä.
 * 
 * 3. Constructorissa alaviivalla merkityt parametrit kummastuttavat. Alaviivahan ilmeisesti viittaa siihen, että parametri ei ole käytössä (unused).
 * Vaikka get-funktion kanssa onkin käytettävä _muuttujia, niin jokaisessa parametrissä oleva _muuttuja vaikuttaa oudolta.
 * Vaikuttaa hieman sekavalta ja ilman alaviivoja voisi olla selkeämpi. Jos get-funktio ne vaatii, niin voisko ne laittaa suoraan muuttujiin esimerkiksi private _htlm.
    Jos taas tarkoituksena on tehdä parametreistä vapaavalintaisia (optional), niin merkitsisin ne muotoon:
    constructor(name?: string, age?: number, color?: string)


/** */
namespace PreAssignment {

    export class Cat {
        #name: string;
        #age: number;

        constructor(_name: string, _age: number) {
            this.#name = _name;
            this.#age = _age;
        }

        get(): object {
            return {
                "name": this.#name,
                "age": this.#age
            };
        }
    }

    export class Dog {
        #name: string;
        #age: number;
        #color: string;

        constructor(_name: string, _age: number, _color: string) {
            this.#name = _name;
            this.#age = _age;
            this.#color = _color;
        }

        get(): object {
            return {
                "name": this.#name,
                "age": this.#age,
                "color": this.#color
            };
        }
    }

    export function PrintCats(cats: Cat[], addHeader: boolean): string {
        let html: string;
        let data: object;
        html = "";

		if (addHeader) {
            data = cats[0].get();
			let keys = Object.keys(data);

			html += "<div class='row header'>";

			for (let key in keys) {
				html += "<div class='col-1'>"+ keys[key] +"</div>";
			}

			html += "</div>";
		}

        for (let i in cats) {
            data = cats[i].get();

            let values = Object.values(data);
            html += "<div class='row'>";

            for (let val in values) {
                html += "<div class='col-1'>" + values[val] + "</div>";
            }

            html += "</div>";
        }

        return html;
    }

    export function PrintDogs(dogs: Dog[], addHeader: boolean): string {
        let html: string;
        let data: object;
        html = "";

		if (addHeader) {
            data = dogs[0].get();
			let keys = Object.keys(data);

			html += "<div class='row header'>";

			for (let key in keys) {
				html += "<div class='col-1'>" + keys[key] + "</div>";
			}

			html += "</div>";
		}

        for (let i in dogs) {
            data = dogs[i].get();

            let values = Object.values(data);
            html += "<div class='row'>";

            for (let val in values) {
                html += "<div class='col-1'>" + values[val] + "</div>";
            }

            html += "</div>";
        }

        return html;
    }
}

// This is just init data, ignore code below this line in the task
const catsInitData = ["Leo","Bella","Milo","Charlie","Kitty","Lucy","Nala","Simba","Jack","Loki"];
const dogsInitData = ["Max", "Coco", "Rex", "Bella", "Scooby", "Rocky", "Daisy", "Fluffy", "Buddy", "Duke"];

document.addEventListener("DOMContentLoaded", function () {
    var catArray: PreAssignment.Cat[] = [];
    var dogArray: PreAssignment.Dog[] = [];
    var age: number = 0;

    for (var i in catsInitData) {
        catArray.push(new PreAssignment.Cat(catsInitData[i], ++age));
        dogArray.push(new PreAssignment.Dog(dogsInitData[i], age, (age % 2 == 0 ? "brown" : age % 3 == 0 ? "yellow" : "black")));
    }

    let catsContainer = document.getElementById('catsContainer');
    if (catsContainer) {
        (catsContainer as HTMLFormElement).innerHTML = PreAssignment.PrintCats(catArray, true);
    }
    let dogsContainer = document.getElementById('dogsContainer');
    if (dogsContainer) {
        (dogsContainer as HTMLFormElement).innerHTML = PreAssignment.PrintDogs(dogArray, true);
    }
});
