contract;

storage {
    counter: u64 = 0,
}

abi Counter {
    #[storage(read)]
    fn counter() -> u64;

    #[storage(read,write)]
    fn increment();
}

impl Counter for Contract {
    #[storage(read)]
    fn counter() -> u64 {
       return storage.counter.read();
    }
 
    #[storage(read, write)]
    fn increment() {
        require(storage.counter.read() < 3, "Counter is at maximum value");
        let incremented = storage.counter.read() + 1;
        storage.counter.write(incremented);
    }
}


// #[test]
// fn test_counter() {
//     let counter = abi(Counter, CONTRACT_ID);
//     assert(counter.counter() == 0);

//     counter.increment();
//     assert(counter.counter() == 1);
// }

// #[test(should_revert)]
// fn test_require() {
//     let counter = abi(Counter, CONTRACT_ID);

//     counter.increment();
//     counter.increment();
//     counter.increment();    
//     counter.increment();
// }   