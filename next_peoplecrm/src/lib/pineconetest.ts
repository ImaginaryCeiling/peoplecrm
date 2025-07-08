import { Pinecone } from "@pinecone-database/pinecone"
import { waitForDebugger } from "inspector";
import 'dotenv/config';
import { Search } from "lucide-react";

async function main() {
    const apiKey = process.env.PINECONE_API_KEY;
    if (!apiKey) {
        throw new Error("PINECONE_API_KEY is not defined");
    }

    const pc = new Pinecone({
        apiKey: apiKey,
    });

    const indexName = "test-index";

    await pc.createIndexForModel({
        name: "test-index",
        cloud:'aws',
        region:'us-east-1',
        embed: {
            model: 'llama-text-embed-v2',
            fieldMap: { text: 'chunk_text'},
        },
        waitUntilReady: true,
    })

    const records = [
        { "_id": "rec1", "chunk_text": "The Eiffel Tower was completed in 1889 and stands in Paris, France.", "category": "history" },
        { "_id": "rec2", "chunk_text": "Photosynthesis allows plants to convert sunlight into energy.", "category": "science" },
        { "_id": "rec3", "chunk_text": "Albert Einstein developed the theory of relativity.", "category": "science" },
        { "_id": "rec4", "chunk_text": "The mitochondrion is often called the powerhouse of the cell.", "category": "biology" },
        { "_id": "rec5", "chunk_text": "Shakespeare wrote many famous plays, including Hamlet and Macbeth.", "category": "literature" },
        { "_id": "rec6", "chunk_text": "Water boils at 100°C under standard atmospheric pressure.", "category": "physics" },
        { "_id": "rec7", "chunk_text": "The Great Wall of China was built to protect against invasions.", "category": "history" },
        { "_id": "rec8", "chunk_text": "Honey never spoils due to its low moisture content and acidity.", "category": "food science" },
        { "_id": "rec9", "chunk_text": "The speed of light in a vacuum is approximately 299,792 km/s.", "category": "physics" },
        { "_id": "rec10", "chunk_text": "Newton's laws describe the motion of objects.", "category": "physics" }
      ];
      
      const index = pc.index(indexName).namespace("ns1");
      
      await index.upsertRecords(records);

      const stats  =  await index.describeIndexStats();
      console.log(stats);

      
}

async function semanticSearch() {
    const apiKey = process.env.PINECONE_API_KEY;
    if (!apiKey) {
        throw new Error("PINECONE_API_KEY is not defined");
    }

    const pc = new Pinecone({
        apiKey: apiKey,
    });
    const indexName = "test-index";
    const query = 'Scientific discoveries';
    const index = pc.index(indexName).namespace("ns1");

    const results = await index.searchRecords({
    query: {
        topK: 5,
        inputs: { text: query },
    },
    });

    console.log('Search Results:');
    console.log(JSON.stringify(results, null, 2));
    
    //log individual hits with their details
    if (results.result?.hits) {
        console.log('\nIndividual Hits:');
        results.result.hits.forEach((hit, index) => {
            console.log(`\nHit ${index + 1}:`);
            console.log(`  ID: ${hit._id}`);
            console.log(`  Score: ${hit._score}`);
            console.log(`  Fields:`, hit.fields);
        });
    }
}

async function rerankSearch() {
    const apiKey = process.env.PINECONE_API_KEY;
    if (!apiKey) {
        throw new Error("PINECONE_API_KEY is not defined");
    }

    const pc = new Pinecone({
        apiKey: apiKey,
    });
    const indexName = "test-index";
    const query = 'Biology discoveries';
    const index = pc.index(indexName).namespace("ns1");

    const rerankedResults = await index.searchRecords({
        query: {
          topK: 5,
          inputs: { text: query },
        },
        rerank: {
          model: 'bge-reranker-v2-m3',
          topN: 5,
          rankFields: ['chunk_text'],
        },
      });
      
      console.log('Reranked Search Results:');
      console.log(JSON.stringify(rerankedResults, null, 2));
      
      //log individual reranked hits with their details
      if (rerankedResults.result?.hits) {
          console.log('\nReranked Individual Hits:');
          rerankedResults.result.hits.forEach((hit, index) => {
              console.log(`\nReranked Hit ${index + 1}:`);
              console.log(`  ID: ${hit._id}`);
              console.log(`  Score: ${hit._score}`);
              console.log(`  Fields:`, hit.fields);
          });
      }
}

// Run the main function
semanticSearch().catch(console.error);
rerankSearch().catch(console.error);
semanticSearch().catch(console.error);