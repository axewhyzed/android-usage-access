import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  ActivityIndicator,
} from 'react-native';

// Import your module functions
import {
  requestUsagePermission,
  getScreenTime,
  getDeviceTimezone,
  FormattedAppUsage
} from './src/native/AndroidUsageAccess';

const App = () => {
  const [usageData, setUsageData] = useState<FormattedAppUsage[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [permissionStatus, setPermissionStatus] = useState<string>('unknown');
  const [timezone, setTimezone] = useState<string>('');

  // Check permission on mount
  useEffect(() => {
    checkPermission();
    fetchTimezone();
  }, []);

  const fetchTimezone = async () => {
    try {
      const tz = await getDeviceTimezone();
      setTimezone(tz);
    } catch (error) {
      console.error('Error fetching timezone:', error);
    }
  };

  const checkPermission = async () => {
    try {
      const status = await requestUsagePermission();
      console.log(status)
      setPermissionStatus(status);

      if (status !== 'Permission already granted') {
        // Wait for a short period before re-checking
        setTimeout(async () => {
          const newStatus = await requestUsagePermission();
          setPermissionStatus(newStatus);
        }, 1000); // 1-second delay
      }
    } catch (error) {
      console.error('Error checking permission:', error);
      setPermissionStatus('error');
    }
  };

  const fetchUsageData = async () => {
    setLoading(true);
    try {
      const data = await getScreenTime();
      setUsageData(data);
    } catch (error) {
      console.error('Error fetching usage data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.title}>App Usage Statistics</Text>
        <Text style={styles.subtitle}>Device Timezone: {timezone}</Text>
        <Text style={styles.subtitle}>
          Permission Status: {permissionStatus}
        </Text>
        <Button
          title="Request Permission"
          onPress={checkPermission}
          disabled={permissionStatus === 'Permission already granted'}
        />
        <Button
          title="Fetch Usage Data"
          onPress={fetchUsageData}
          disabled={permissionStatus !== 'Permission already granted' || loading}
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView style={styles.scrollView}>
          {usageData.length > 0 ? (
            usageData.map((app, index) => (
              <View key={index} style={styles.appItem}>
                {app.icon ? (
                  <Image
                    source={{ uri: `data:image/png;base64,${app.icon}` }}
                    style={styles.appIcon}
                  />
                ) : (
                  <View style={styles.placeholderIcon} />
                )}
                <View style={styles.appInfo}>
                  <Text style={styles.appName}>{app.appName}</Text>
                  <Text style={styles.packageName}>{app.packageName}</Text>
                  <Text style={styles.usageText}>
                    Screen time: {app.screenTime}
                  </Text>
                  <Text style={styles.usageText}>
                    Last used: {app.lastUsed}
                  </Text>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.noDataText}>
              {permissionStatus === 'granted'
                ? 'No usage data available. Tap "Fetch Usage Data" to load.'
                : 'Please grant usage access permission first.'}
            </Text>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  appItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  appIcon: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  placeholderIcon: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: '#DDDDDD',
  },
  appInfo: {
    marginLeft: 12,
    flex: 1,
  },
  appName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  packageName: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 4,
  },
  usageText: {
    fontSize: 14,
    color: '#333333',
  },
  noDataText: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginTop: 40,
  },
});

export default App;