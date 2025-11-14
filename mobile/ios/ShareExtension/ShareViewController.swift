import UIKit
import Social
import MobileCoreServices
import UniformTypeIdentifiers

class ShareViewController: UIViewController {
    var selectedTags: [String] = []
    var selectedFolder: String?
    var imageData: Data?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setupUI()
        loadSharedImage()
    }
    
    func setupUI() {
        view.backgroundColor = .systemBackground
        
        let titleLabel = UILabel()
        titleLabel.text = "Save to SnapXtract"
        titleLabel.font = .systemFont(ofSize: 20, weight: .bold)
        titleLabel.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(titleLabel)
        
        let saveButton = UIButton(type: .system)
        saveButton.setTitle("Save", for: .normal)
        saveButton.addTarget(self, action: #selector(saveScreenshot), for: .touchUpInside)
        saveButton.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(saveButton)
        
        let cancelButton = UIButton(type: .system)
        cancelButton.setTitle("Cancel", for: .normal)
        cancelButton.addTarget(self, action: #selector(cancel), for: .touchUpInside)
        cancelButton.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(cancelButton)
        
        NSLayoutConstraint.activate([
            titleLabel.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor, constant: 20),
            titleLabel.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            saveButton.bottomAnchor.constraint(equalTo: view.safeAreaLayoutGuide.bottomAnchor, constant: -20),
            saveButton.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -20),
            cancelButton.bottomAnchor.constraint(equalTo: view.safeAreaLayoutGuide.bottomAnchor, constant: -20),
            cancelButton.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 20)
        ])
    }
    
    func loadSharedImage() {
        guard let extensionItem = extensionContext?.inputItems.first as? NSExtensionItem,
              let itemProvider = extensionItem.attachments?.first else { return }
        
        if itemProvider.hasItemConformingToTypeIdentifier(UTType.image.identifier) {
            itemProvider.loadItem(forTypeIdentifier: UTType.image.identifier, options: nil) { [weak self] (item, error) in
                if let url = item as? URL {
                    self?.imageData = try? Data(contentsOf: url)
                } else if let image = item as? UIImage {
                    self?.imageData = image.jpegData(compressionQuality: 0.8)
                }
            }
        }
    }
    
    @objc func saveScreenshot() {
        guard let imageData = imageData else { return }
        
        let sharedDefaults = UserDefaults(suiteName: "group.com.snapxtract.app")
        let timestamp = Date().timeIntervalSince1970
        let filename = "shared_\(timestamp).jpg"
        
        if let containerURL = FileManager.default.containerURL(forSecurityApplicationGroupIdentifier: "group.com.snapxtract.app") {
            let fileURL = containerURL.appendingPathComponent(filename)
            try? imageData.write(to: fileURL)
            
            var pendingUploads = sharedDefaults?.array(forKey: "pendingUploads") as? [[String: Any]] ?? []
            pendingUploads.append([
                "filename": filename,
                "tags": selectedTags,
                "folder": selectedFolder ?? "",
                "timestamp": timestamp
            ])
            sharedDefaults?.set(pendingUploads, forKey: "pendingUploads")
        }
        
        extensionContext?.completeRequest(returningItems: [], completionHandler: nil)
    }
    
    @objc func cancel() {
        extensionContext?.cancelRequest(withError: NSError(domain: "com.snapxtract.share", code: -1, userInfo: nil))
    }
}
