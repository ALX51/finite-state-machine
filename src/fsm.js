class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
         if ( config != undefined){
    		this.curentCoant = 0;
    		this.previous = new Array(config.initial);
    		this.initial1 = config.initial;
	    	this.initial = config.initial;
	    	this.states = config.states;
	    } else {
	    	throw new Error;
	    }
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.initial;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (this.states[state] != undefined){
    		this.initial = state;
            if (this.initial != this.previous[this.curentCoant + 1] ) {
                this.previous.push(this.initial);
                this.curentCoant = this.previous.length - 1;
            } else {
                this.curentCoant = (this.curentCoant + 1);
            }
    	} else {
    		throw new Error;
    	}
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        if(this.states[this.initial].transitions[event] != undefined) {
    		this.initial = this.states[this.initial].transitions[event];
            if (this.initial != this.previous[this.curentCoant + 1] ) {
                this.previous.push(this.initial);
                this.curentCoant = this.previous.length - 1;
            } else {
                this.curentCoant = (this.curentCoant + 1);
            }
    	} else {
    		throw new Error;
    	}
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.initial = this.initial1;
    	this.previous.push(this.initial);
    	this.curentCoant = this.previous.length - 1;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        var arr = [];
    	if (event == undefined) {
    		for (var key in this.states) {
    			arr.push(key + '');
    		}
    	} else {
    		for (var key1 in this.states) {
    			if ( this.states[key1].transitions[event]) {
    				arr.push(key1 + '');
    			}
    		}
    	}
    	return arr;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.curentCoant <= 0) {
    		return false;
    	} else {
    		this.curentCoant = this.curentCoant - 1;
    		this.initial = this.previous[this.curentCoant];
    		return true;
    	}
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if ((this.curentCoant < 0) || (this.curentCoant >= this.previous.length) ) {
    		return false;
    	} else {
    		if ((this.curentCoant < 0) || (this.curentCoant >= (this.previous.length - 1)) ) {
    		return false;
    	}
            this.curentCoant = (this.curentCoant + 1);
    		this.initial = this.previous[this.curentCoant];
    		return true;
    	}
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.previous.length = 0;
        this.curentCoant = 0;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
