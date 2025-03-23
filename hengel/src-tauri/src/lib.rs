use std::fs;
use tauri::AppHandle;
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            if cfg!(debug_assertions) {
                app.handle().plugin(
                    tauri_plugin_log::Builder::default()
                        .level(log::LevelFilter::Info)
                        .build(),
                )?;
            }
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
#[tauri::command]
fn start_read(app: AppHandle) {
    tauri::async_runtime::spawn(async move {
        loop {
            let contents = fs::read_to_string("counter").expect("Something stupid happened");
            let num: u32 = contents.parse().unwrap();
            println!("{:#?}", num)
        }
    });
}
