# Splatnet 2 OCR+

Script that uses opencv and tesseract to extract data from splatnet 2 share images, returns a json object

## Notes
* try opencv compareHist or matchTemplate to identify stage/weapon. (or feature matching)
* may just be able to read text, but might not be reliable enough
* going to be tricky to identify room type (regular, ranked, league, private, fest)

### Tesseract options
* assume_fixed_pitch_char_segment	0	include fixed-pitch heuristics in char segmentation
* classify_bln_numeric_mode	0	Assume the input is numbers [0-9].
* edges_min_nonhole	12	Min pixels for potential char in box
* gapmap_use_ends	0	Use large space at start and end of rows
* interactive_display_mode	0	Run interactively?
* language_model_ngram_nonmatch_score	-40	Average classifier score of a non-matching unichar.
* language_model_penalty_case	0.1	Penalty for inconsistent case
* language_model_penalty_chartype	0.3	Penalty for inconsistent character type
* language_model_penalty_font	0	Penalty for inconsistent font
* language_model_penalty_non_dict_word	0.15	Penalty for non-dictionary words
* language_model_penalty_non_freq_dict_word	0.1	Penalty for words not in the frequent word dictionary
* segment_nonalphabetic_script	0	Don't use any alphabetic-specific tricks.Set to true in the traineddata config file for scripts that are cursive or inherently fixed-pitch
* Score multiplier for word matches which have good case andare frequent in the given language (lower is better).
* segment_penalty_dict_nonword	1.25	Score multiplier for glyph fragment segmentations which do not match a dictionary word (lower is better).
* tessedit_char_blacklist		Blacklist of chars not to recognize
* tessedit_char_unblacklist		List of chars to override tessedit_char_blacklist
* tessedit_char_whitelist		Whitelist of chars to recognize
* tessedit_consistent_reps	1	Force all rep chars the same
* tessedit_dump_pageseg_images	0	Dump intermediate images made during page segmentation
* tessedit_flip_0O	1	Contextual 0O O0 flips
* tessedit_image_border	2	Rej blbs near image edge limit
* tessedit_ocr_engine_mode	0	Which OCR engine(s) to run (Tesseract, Cube, both). Defaults to loading and running only Tesseract (no Cube,no combiner). Values from OcrEngineMode enum in tesseractclass.h)
* tessedit_pageseg_mode	6	Page seg mode: 0=osd only, 1=auto+osd, 2=auto, 3=col, 4=block, 5=line, 6=word, 7=char (Values from PageSegMode enum in publictypes.h)
* tessedit_redo_xheight	1	Check/Correct x-height
* tessedit_reject_block_percent	45	%rej allowed before rej whole block
* tessedit_reject_doc_percent	65	%rej allowed before rej whole doc
* tessedit_zero_rejection	0	Dont reject ANYTHING
* textord_all_prop	0	All doc is proportional text
* textord_blob_size_bigile	95	Percentile for large blobs
* textord_blob_size_smallile	20	Percentile for small blobs
* textord_blockndoc_fixed	0	Attempt whole doc/block fixed pitch
* textord_equation_detect 0	Turn on equation detector
* textord_no_rejects	0	Don't remove noise blobs
* textord_single_height_mode	0	Script has no xheight, so use a single mode
* user_patterns_file		A filename of user-provided patterns.
