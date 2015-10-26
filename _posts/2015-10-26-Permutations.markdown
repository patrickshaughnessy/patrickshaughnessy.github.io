---
layout: post
title:  “Permutations”
date:   2015-10-26 11:58:30
categories: pre Coding House
---

Finding all the permutations of a string was probably one of the hardest algorithm challenges that I’ve done so far. So in order to understand it more fully, I’ll try to explain how I did it here.

The trick is to use heap sort. It’s a recursive function, which means that it continues to call itself from within the function body. 

This can lead to problems with infinite loops so it’s important to make sure you define your function’s endpoint. Additionally, that endpoint has to be accessible despite (or before) the function call within the body.

It’s a little tough to wrap your head around at first. I found [this video](https://www.youtube.com/watch?v=1Taz3r2mB5U “YouTube video”) to be really thorough and helpful.

Don’t worry if you don’t get it right away - I had to watch the video at least a few times before I could even follow what he was talking about.

#The Main Event

Ok, so you want to find all the permutations of the string “xyz” and output them to an array. Let’s set up our function:

<pre>
	function permute(string){
  	  var result = [];
	
  	  var output = [];
  	  var used = [];
  	  var position = 0;
  	
  	  return result;
	}
</pre>
Here we are initializing the variables we’ll need in the recursive part of the function as well as a place to store our permutations.

The function hinges on an output variable, which will store the permutation itself, and a used variable, which will use booleans keep track of which letters have been used already in each call.

Now let’s work on the meat of our recursive call:
<pre>
	function permute(string){
  	  var result = [];
  	
  	  var output = [];
  	  var used = [];
  	  var position = 0;
  	
  	  var permutations = function(string, output, used, position){
    	    if (position === string.length){
    	      result.push(output.join(''));
          };
  	  permutations(string, output, used, position);
  	  return result;
	}
</pre>
Here I’ve added the permutations recursive function as a variable as well as the initial call prior to returning results. We first check to see if the the position variable equals the length of the string, which will tell us that our output variable has a complete permutation ready for storage in results. We’ll then push that completed string into the results array.
<pre>
	function permute(string){
  	  var result = [];
  	
  	  var output = [];
  	  var used = [];
  	  var position = 0;
  	
  	  var permutations = function(string, output, used, position){
    	    if (position === string.length){
    	      result.push(output.join(''));
	    } else {
      	      for (var i = 0; i < string.length; i++){
        	if (used[i] !== true){
          	  output.push(string[i]);
          	  used[i] = true;
        	}
      	      }
    	    }
          };
  	  permutations(string, output, used, position);
  	  return result;
	}
</pre>
If we are not finished with the permutation, we’ll need to continue adding to the output with a for loop. First we’ll check if the first position, used[i], is true. Since the first time around it will not be, we’ll push the letter at that index to the output string, and mark it used, or true.
<pre>
	function permute(string){
  	  var result = [];
  	
  	  var output = [];
  	  var used = [];
  	  var position = 0;
  	
  	  var permutations = function(string, output, used, position){
    	    if (position === string.length){
    	      result.push(output.join(''));
	    } else {
      	      for (var i = 0; i < string.length; i++){
        	if (used[i] !== true){
          	  output.push(string[i]);
          	  used[i] = true;
          	  permutations(string, output, used, position+1);
        	}
      	      }
    	    }
          };
  	  permutations(string, output, used, position);
  	  return result;
	}
</pre>
Next we’ll call the permutations function again, passing all the variables as before, except that we’ll increment our position by 1. Since we’ve already set up the “endpoint” of the recursive call to be the string length, this keeps our function from entering an infinite loop.
<pre>
	function permute(string){
  	  var result = [];
  	
  	  var output = [];
  	  var used = [];
  	  var position = 0;
  	
  	  var permutations = function(string, output, used, position){
    	    if (position === string.length){
    	      result.push(output.join(''));
	    } else {
      	      for (var i = 0; i < string.length; i++){
        	if (used[i] !== true){
          	  output.push(string[i]);
          	  used[i] = true;
          	  permutations(string, output, used, position+1);
		  output.pop();
		  used[i] = false;
        	}
      	      }
    	    }
          };
  	  permutations(string, output, used, position);
  	  return result;
	}
</pre>
Finally we’ll add some code that will work us back through the output array, resetting it for the set of permutations that begin with the letter at index 1, 2, 3 and so on.

This was the second tricky part to wrap my head around. I still don’t feel like I can really explain it properly, but the best way for me to picture it is that the permute wrapper function is providing an environment for the permutations function to create a new output array every time it’s called. While one output is getting completed, another might be finishing and getting pushed to the results or getting emptied to prepare for another round. If that makes sense. I hope it does!

##Final Thoughts

That’s it! Not too bad once you work it out a couple times. It’s still gets a little fuzzy for me if I think about it too hard in the body of the function. But practice makes perfect!

Keep calm and code on.