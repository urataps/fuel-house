contract;

use std::{
    context::msg_amount
};

storage {
    counter: u64 = 0
}

abi Counter {
    #[storage(read)]
    fn counter() -> u64;

    #[storage(read,write), payable]
    fn increment();
}

impl Counter for Contract {
    #[storage(read)]
    fn counter() -> u64 {
       return storage.counter.read();
    }
 
    #[storage(read, write), payable]
    fn increment() {
        assert(100 < msg_amount());

        let incremented = storage.counter.read() + 1;
        storage.counter.write(incremented);
    }
}

