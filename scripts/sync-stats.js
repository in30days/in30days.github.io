const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// Initialize Firebase Admin
if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
} else {
  console.error('FIREBASE_SERVICE_ACCOUNT environment variable is not set.');
  process.exit(1);
}

const db = admin.firestore();

async function syncStats() {
  console.log('Starting stats sync...');
  const stats = {};

  try {
    // We use a collection group query to find all "courses" documents across all users
    // Structure: users/{userId}/courses/{courseId}
    const coursesSnapshot = await db.collectionGroup('courses').get();
    
    console.log(`Found ${coursesSnapshot.size} total course records.`);

    coursesSnapshot.forEach(doc => {
      const courseId = doc.id;
      if (!stats[courseId]) {
        stats[courseId] = 0;
      }
      stats[courseId]++;
    });

    // Also handle learning paths - currently we don't store "path" progress separately
    // but we can estimate path interest by the number of people who started the first course of the path
    // or just keep existing stats for paths if they are manually tracked for now.
    
    // For this implementation, we focus on actual course data from Firestore
    console.log('Aggregated Stats:', stats);

    const statsPath = path.join(__dirname, '../main-site/data/stats.yaml');
    
    // Load existing stats to preserve values for things not in Firestore (like paths)
    let existingStats = {};
    if (fs.existsSync(statsPath)) {
      existingStats = yaml.load(fs.readFileSync(statsPath, 'utf8')) || {};
    }

    // Merge: Firestore counts override existing ones for courses found in Firestore
    const finalStats = { ...existingStats, ...stats };

    fs.writeFileSync(statsPath, yaml.dump(finalStats), 'utf8');
    console.log('stats.yaml updated successfully.');

  } catch (error) {
    console.error('Error syncing stats:', error);
    process.exit(1);
  }
}

syncStats().then(() => process.exit(0));
