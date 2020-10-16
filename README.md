# auto-suggest-using-trie

This is a plain javascript implementation of Trie data structure.
When you enter the **lowercase** words, it will get saved in trie locally. 
*The inserted words will be displayed on the right side.*

When you will search for any word/s, the inserted value at that instant is considered as a prefix.
The trie will return all the words which starts with the prefix. 

Note: Current maximum suggestion limit is set to 10. So max 10 suggestions will be shown.
