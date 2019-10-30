import {CarbonLDP} from "carbonldp";
const carbonldp = new CarbonLDP("https://data-itesm.lab.base22.com/");

export default class MovieSearch {
    static async getWeightbyKeyword() {

    	let arr: any[] = [];
        carbonldp.documents.$executeSELECTQuery(
            `
            PREFIX educore: <http://www.ebu.ch/metadata/ontologies/ebucore/ebucore#>
            PREFIX w3: <http://www.w3.org/2000/01/rdf-schema#>
            SELECT ?keyword ?label (COUNT(?label) AS ?count)
            WHERE {
                <https://data-itesm.lab.base22.com/movies/> <http://www.w3.org/ns/ldp#contains> ?movie .
                ?movie educore:Keyword ?keyword .
                ?keyword w3:label ?label .
            }
            GROUP BY ?keyword ?label
            ORDER BY DESC(?count)
            LIMIT 50
            `
        ).then((response) => {
        	response.forEach((ob) => {
        		let json = {
        			weight: ob.count,
        			keyword: ob.label,
        			link: ob.$id
        		}
        		
        		arr.push(json)
        	});
            console.log(arr);
        });
    }
}
