import WidgetKit
import SwiftUI

struct Provider: TimelineProvider {
    func placeholder(in context: Context) -> ScreenshotEntry {
        ScreenshotEntry(date: Date(), screenshots: [])
    }

    func getSnapshot(in context: Context, completion: @escaping (ScreenshotEntry) -> ()) {
        let entry = ScreenshotEntry(date: Date(), screenshots: loadRecentScreenshots())
        completion(entry)
    }

    func getTimeline(in context: Context, completion: @escaping (Timeline<Entry>) -> ()) {
        let currentDate = Date()
        let refreshDate = Calendar.current.date(byAdding: .minute, value: 15, to: currentDate)!
        let entry = ScreenshotEntry(date: currentDate, screenshots: loadRecentScreenshots())
        let timeline = Timeline(entries: [entry], policy: .after(refreshDate))
        completion(timeline)
    }
    
    func loadRecentScreenshots() -> [Screenshot] {
        let sharedDefaults = UserDefaults(suiteName: "group.com.snapxtract.app")
        guard let data = sharedDefaults?.data(forKey: "recentScreenshots"),
              let screenshots = try? JSONDecoder().decode([Screenshot].self, from: data) else {
            return []
        }
        return Array(screenshots.prefix(5))
    }
}

struct ScreenshotEntry: TimelineEntry {
    let date: Date
    let screenshots: [Screenshot]
}

struct Screenshot: Codable, Identifiable {
    let id: String
    let thumbnailUrl: String
    let tags: [String]
    let createdAt: String
}

struct SnapXtractWidgetEntryView : View {
    var entry: Provider.Entry

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text("Recent Screenshots")
                .font(.headline)
                .padding(.bottom, 4)
            
            if entry.screenshots.isEmpty {
                Text("No screenshots yet")
                    .font(.caption)
                    .foregroundColor(.secondary)
            } else {
                ForEach(entry.screenshots) { screenshot in
                    HStack {
                        AsyncImage(url: URL(string: screenshot.thumbnailUrl)) { image in
                            image.resizable().aspectRatio(contentMode: .fill)
                        } placeholder: {
                            Color.gray
                        }
                        .frame(width: 40, height: 40)
                        .cornerRadius(6)
                        
                        VStack(alignment: .leading) {
                            Text(screenshot.tags.joined(separator: ", "))
                                .font(.caption)
                                .lineLimit(1)
                            Text(screenshot.createdAt)
                                .font(.caption2)
                                .foregroundColor(.secondary)
                        }
                    }
                }
            }
        }
        .padding()
    }
}

@main
struct SnapXtractWidget: Widget {
    let kind: String = "SnapXtractWidget"

    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: Provider()) { entry in
            SnapXtractWidgetEntryView(entry: entry)
        }
        .configurationDisplayName("Recent Screenshots")
        .description("View your most recent screenshots")
        .supportedFamilies([.systemSmall, .systemMedium])
    }
}
