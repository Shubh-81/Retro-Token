import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Prelude "mo:base/Prelude";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";

actor Token {

    var owner : Principal = Principal.fromText("rtzv7-o6xcj-mmexk-7qwdk-ldlyt-7tb7e-gulc4-hp7xz-um7nq-b7nge-gqe");
    var totalSupply : Nat = 100000000;
    var symbol : Text = "RET";

    private stable var balancEntries : [(Principal,Nat)] = [];

    private var balances = HashMap.HashMap<Principal,Nat>(1,Principal.equal, Principal.hash);

     if(balances.size() < 1)   balances.put(owner,totalSupply);

    public query func balanceOf(who: Principal) : async Nat {
        let balance : Nat = switch(balances.get(who)) {
            case null 0;
            case (?result) result;
        };
        return balance;
    };

    public query func getSymbol() : async Text {
        return symbol;
    };

    public shared(msg) func payOut() : async Text {
        if(balances.get(msg.caller)==null) {
            let amount = 10000;
            Debug.print(debug_show(msg));
            let response = await transfer(msg.caller,amount);
            return response;
        }
        else {
            return "Already Claimed";
        };
    };

    public shared(msg) func transfer(to: Principal, amount: Nat) : async Text {
        let fromBalance = await balanceOf(msg.caller);
        if(fromBalance > amount) {
            let newFromBalance : Nat = fromBalance - amount;
            balances.put(msg.caller,newFromBalance);
            let toBalance : Nat = await balanceOf(to);
            let newToBalance : Nat = toBalance + amount;
            balances.put(to,newToBalance);
            return "Success";
        }
        else {
            return "Insufficient Funds";
        }
    };

    system func preupgrade() {
        balancEntries := Iter.toArray(balances.entries());
    };

    system func postupgrade() {
        balances:= HashMap.fromIter<Principal,Nat>(balancEntries.vals(),1,Principal.equal,Principal.hash);
        if(balances.size() < 1)   balances.put(owner,totalSupply);
    };

}