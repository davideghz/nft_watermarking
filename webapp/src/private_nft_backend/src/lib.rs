use candid::{CandidType, Deserialize};

#[derive(CandidType, Deserialize)]
struct Collection {
    name: String,
    img: String,
    hash: String,
    address: String,
    is_single: bool
}

#[ic_cdk::query]
fn greet(name: String) -> String {
    format!("Hello, {}!", name)
}
