/*
 * Test harness for diff_match_patch.java
 *
 * Copyright 2006 Google Inc.
 * http://code.google.com/p/google-diff-match-patch/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package name.fraser.neil.plaintext;

import junit.framework.TestCase;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Set;

import name.fraser.neil.plaintext.diff_match_patch.Diff;
import name.fraser.neil.plaintext.diff_match_patch.Patch;

public class diff_match_patch_test extends TestCase {

  private diff_match_patch dmp;
  private diff_match_patch.Operation DELETE = diff_match_patch.Operation.DELETE;
  private diff_match_patch.Operation EQUAL = diff_match_patch.Operation.EQUAL;
  private diff_match_patch.Operation INSERT = diff_match_patch.Operation.INSERT;

  protected void setUp() {
    // Create an instance of the diff_match_patch object.
    dmp = new diff_match_patch();
  }


  //  DIFF TEST FUNCTIONS


  public void testDiffCommonPrefix() {
    // Detect and remove any common prefix.
    assertEquals("diff_commonPrefix: Null case.", 0, dmp.diff_commonPrefix("abc", "xyz"));

    assertEquals("diff_commonPrefix: Non-null case.", 4, dmp.diff_commonPrefix("1234abcdef", "1234xyz"));
  }

  public void testDiffCommonSuffix() {
    // Detect and remove any common suffix.
    assertEquals("diff_commonSuffix: Null case.", 0, dmp.diff_commonSuffix("abc", "xyz"));

    assertEquals("diff_commonSuffix: Non-null case.", 4, dmp.diff_commonSuffix("abcdef1234", "xyz1234"));
  }

  public void testDiffHalfmatch() {
    // Detect a halfmatch.
    assertNull("diff_halfMatch: No match.", dmp.diff_halfMatch("1234567890", "abcdef"));

    assertArrayEquals("diff_halfMatch: Single Match #1.", new String[]{"12", "90", "a", "z", "345678"}, dmp.diff_halfMatch("1234567890", "a345678z"));

    assertArrayEquals("diff_halfMatch: Single Match #2.", new String[]{"a", "z", "12", "90", "345678"}, dmp.diff_halfMatch("a345678z", "1234567890"));

    assertArrayEquals("diff_halfMatch: Multiple Matches #1.", new String[]{"12123", "123121", "a", "z", "1234123451234"}, dmp.diff_halfMatch("121231234123451234123121", "a1234123451234z"));

    assertArrayEquals("diff_halfMatch: Multiple Matches #2.", new String[]{"", "-=-=-=-=-=", "x", "", "x-=-=-=-=-=-=-="}, dmp.diff_halfMatch("x-=-=-=-=-=-=-=-=-=-=-=-=", "xx-=-=-=-=-=-=-="));

    assertArrayEquals("diff_halfMatch: Multiple Matches #3.", new String[]{"-=-=-=-=-=", "", "", "y", "-=-=-=-=-=-=-=y"}, dmp.diff_halfMatch("-=-=-=-=-=-=-=-=-=-=-=-=y", "-=-=-=-=-=-=-=yy"));
  }

  public void testDiffLinesToChars() {
    // Convert lines down to characters
    ArrayList<String> tmpVector = new ArrayList<String>();
    tmpVector.add("");
    tmpVector.add("alpha\n");
    tmpVector.add("beta\n");
    assertArrayEquals("diff_linesToChars:", new Object[]{"\u0001\u0002\u0001", "\u0002\u0001\u0002", tmpVector}, dmp.diff_linesToChars("alpha\nbeta\nalpha\n", "beta\nalpha\nbeta\n"));

    tmpVector.clear();
    tmpVector.add("");
    tmpVector.add("alpha\r\n");
    tmpVector.add("beta\r\n");
    tmpVector.add("\r\n");
    assertArrayEquals("diff_linesToChars:", new Object[]{"", "\u0001\u0002\u0003\u0003", tmpVector}, dmp.diff_linesToChars("", "alpha\r\nbeta\r\n\r\n\r\n"));

    tmpVector.clear();
    tmpVector.add("");
    tmpVector.add("a");
    tmpVector.add("b");
    assertArrayEquals("diff_linesToChars:", new Object[]{"\u0001", "\u0002", tmpVector}, dmp.diff_linesToChars("a", "b"));

    // More than 256
    int n = 300;
    //StringBuilder lineList = new StringBuilder();
    tmpVector.clear();
    StringBuilder lineList = new StringBuilder();
    StringBuilder charList = new StringBuilder();
    for (int x = 1; x < n + 1; x++) {
      tmpVector.add(x + "\n");
      lineList.append(x + "\n");
      charList.append(String.valueOf((char) x));
    }
    assertEquals(n, tmpVector.size());
    String lines = lineList.toString();
    String chars = charList.toString();
    assertEquals(n, chars.length());
    tmpVector.add(0, "");
    assertArrayEquals("diff_linesToChars: More than 256.", new Object[]{chars, "", tmpVector}, dmp.diff_linesToChars(lines, ""));
  }

  public void testDiffCharsToLines() {
    // First check that Diff equality works
    assertTrue("diff_charsToLines:", new Diff(EQUAL, "a").equals(new Diff(EQUAL, "a")));

    assertEquals("diff_charsToLines:", new Diff(EQUAL, "a"), new Diff(EQUAL, "a"));

    // Convert chars up to lines
    LinkedList<Diff> diffs = diffList(new Diff(EQUAL, "\u0001\u0002\u0001"), new Diff(INSERT, "\u0002\u0001\u0002"));
    ArrayList<String> tmpVector = new ArrayList<String>();
    tmpVector.add("");
    tmpVector.add("alpha\n");
    tmpVector.add("beta\n");
    dmp.diff_charsToLines(diffs, tmpVector);
    assertEquals("diff_charsToLines:", diffList(new Diff(EQUAL, "alpha\nbeta\nalpha\n"), new Diff(INSERT, "beta\nalpha\nbeta\n")), diffs);

    // More than 256
    int n = 300;
    //StringBuilder lineList = new StringBuilder();
    tmpVector.clear();
    StringBuilder lineList = new StringBuilder();
    StringBuilder charList = new StringBuilder();
    for (int x = 1; x < n + 1; x++) {
      tmpVector.add(x + "\n");
      lineList.append(x + "\n");
      charList.append(String.valueOf((char) x));
    }
    assertEquals(n, tmpVector.size());
    String lines = lineList.toString();
    String chars = charList.toString();
    assertEquals(n, chars.length());
    tmpVector.add(0, "");
    diffs = diffList(new Diff(DELETE, chars));
    dmp.diff_charsToLines(diffs, tmpVector);
    assertEquals("diff_charsToLines: More than 256.", diffList(new Diff(DELETE, lines)), diffs);
  }

  public void testDiffCleanupMerge() {
    // Cleanup a messy diff
    LinkedList<Diff> diffs = diffList();
    dmp.diff_cleanupMerge(diffs);
    assertEquals("diff_cleanupMerge: Null case.", diffList(), diffs);

    diffs = diffList(new Diff(EQUAL, "a"), new Diff(DELETE, "b"), new Diff(INSERT, "c"));
    dmp.diff_cleanupMerge(diffs);
    assertEquals("diff_cleanupMerge: No change case.", diffList(new Diff(EQUAL, "a"), new Diff(DELETE, "b"), new Diff(INSERT, "c")), diffs);

    diffs = diffList(new Diff(EQUAL, "a"), new Diff(EQUAL, "b"), new Diff(EQUAL, "c"));
    dmp.diff_cleanupMerge(diffs);
    assertEquals("diff_cleanupMerge: Merge equalities.", diffList(new Diff(EQUAL, "abc")), diffs);

    diffs = diffList(new Diff(DELETE, "a"), new Diff(DELETE, "b"), new Diff(DELETE, "c"));
    dmp.diff_cleanupMerge(diffs);
    assertEquals("diff_cleanupMerge: Merge deletions.", diffList(new Diff(DELETE, "abc")), diffs);

    diffs = diffList(new Diff(INSERT, "a"), new Diff(INSERT, "b"), new Diff(INSERT, "c"));
    dmp.diff_cleanupMerge(diffs);
    assertEquals("diff_cleanupMerge: Merge insertions.", diffList(new Diff(INSERT, "abc")), diffs);

    diffs = diffList(new Diff(DELETE, "a"), new Diff(INSERT, "b"), new Diff(DELETE, "c"), new Diff(INSERT, "d"), new Diff(EQUAL, "e"), new Diff(EQUAL, "f"));
    dmp.diff_cleanupMerge(diffs);
    assertEquals("diff_cleanupMerge: Merge interweave.", diffList(new Diff(DELETE, "ac"), new Diff(INSERT, "bd"), new Diff(EQUAL, "ef")), diffs);

    diffs = diffList(new Diff(DELETE, "a"), new Diff(INSERT, "abc"), new Diff(DELETE, "dc"));
    dmp.diff_cleanupMerge(diffs);
    assertEquals("diff_cleanupMerge: Prefix and suffix detection.", diffList(new Diff(EQUAL, "a"), new Diff(DELETE, "d"), new Diff(INSERT, "b"), new Diff(EQUAL, "c")), diffs);

    diffs = diffList(new Diff(EQUAL, "a"), new Diff(INSERT, "ba"), new Diff(EQUAL, "c"));
    dmp.diff_cleanupMerge(diffs);
    assertEquals("diff_cleanupMerge: Slide edit left.", diffList(new Diff(INSERT, "ab"), new Diff(EQUAL, "ac")), diffs);

    diffs = diffList(new Diff(EQUAL, "c"), new Diff(INSERT, "ab"), new Diff(EQUAL, "a"));
    dmp.diff_cleanupMerge(diffs);
    assertEquals("diff_cleanupMerge: Slide edit right.", diffList(new Diff(EQUAL, "ca"), new Diff(INSERT, "ba")), diffs);

    diffs = diffList(new Diff(EQUAL, "a"), new Diff(DELETE, "b"), new Diff(EQUAL, "c"), new Diff(DELETE, "ac"), new Diff(EQUAL, "x"));
    dmp.diff_cleanupMerge(diffs);
    assertEquals("diff_cleanupMerge: Slide edit left recursive.", diffList(new Diff(DELETE, "abc"), new Diff(EQUAL, "acx")), diffs);

    diffs = diffList(new Diff(EQUAL, "x"), new Diff(DELETE, "ca"), new Diff(EQUAL, "c"), new Diff(DELETE, "b"), new Diff(EQUAL, "a"));
    dmp.diff_cleanupMerge(diffs);
    assertEquals("diff_cleanupMerge: Slide edit right recursive.", diffList(new Diff(EQUAL, "xca"), new Diff(DELETE, "cba")), diffs);
  }

  public void testDiffCleanupSemanticLossless() {
    // Slide diffs to match logical boundaries
    LinkedList<Diff> diffs = diffList();
    dmp.diff_cleanupSemanticLossless(diffs);
    assertEquals("diff_cleanupSemanticLossless: Null case.", diffList(), diffs);

    diffs = diffList(new Diff(EQUAL, "AAA\r\n\r\nBBB"), new Diff(INSERT, "\r\nDDD\r\n\r\nBBB"), new Diff(EQUAL, "\r\nEEE"));
    dmp.diff_cleanupSemanticLossless(diffs);
    assertEquals("diff_cleanupSemanticLossless: Blank lines.", diffList(new Diff(EQUAL, "AAA\r\n\r\n"), new Diff(INSERT, "BBB\r\nDDD\r\n\r\n"), new Diff(EQUAL, "BBB\r\nEEE")), diffs);

    diffs = diffList(new Diff(EQUAL, "AAA\r\nBBB"), new Diff(INSERT, " DDD\r\nBBB"), new Diff(EQUAL, " EEE"));
    dmp.diff_cleanupSemanticLossless(diffs);
    assertEquals("diff_cleanupSemanticLossless: Line boundaries.", diffList(new Diff(EQUAL, "AAA\r\n"), new Diff(INSERT, "BBB DDD\r\n"), new Diff(EQUAL, "BBB EEE")), diffs);

    diffs = diffList(new Diff(EQUAL, "The c"), new Diff(INSERT, "ow and the c"), new Diff(EQUAL, "at."));
    dmp.diff_cleanupSemanticLossless(diffs);
    assertEquals("diff_cleanupSemanticLossless: Word boundaries.", diffList(new Diff(EQUAL, "The "), new Diff(INSERT, "cow and the "), new Diff(EQUAL, "cat.")), diffs);

    diffs = diffList(new Diff(EQUAL, "The-c"), new Diff(INSERT, "ow-and-the-c"), new Diff(EQUAL, "at."));
    dmp.diff_cleanupSemanticLossless(diffs);
    assertEquals("diff_cleanupSemanticLossless: Alphanumeric boundaries.", diffList(new Diff(EQUAL, "The-"), new Diff(INSERT, "cow-and-the-"), new Diff(EQUAL, "cat.")), diffs);

    diffs = diffList(new Diff(EQUAL, "a"), new Diff(DELETE, "a"), new Diff(EQUAL, "ax"));
    dmp.diff_cleanupSemanticLossless(diffs);
    assertEquals("diff_cleanupSemanticLossless: Hitting the start.", diffList(new Diff(DELETE, "a"), new Diff(EQUAL, "aax")), diffs);

    diffs = diffList(new Diff(EQUAL, "xa"), new Diff(DELETE, "a"), new Diff(EQUAL, "a"));
    dmp.diff_cleanupSemanticLossless(diffs);
    assertEquals("diff_cleanupSemanticLossless: Hitting the end.", diffList(new Diff(EQUAL, "xaa"), new Diff(DELETE, "a")), diffs);
  }

  public void testDiffCleanupSemantic() {
    // Cleanup semantically trivial equalities
    LinkedList<Diff> diffs = diffList();
    dmp.diff_cleanupSemantic(diffs);
    assertEquals("diff_cleanupSemantic: Null case.", diffList(), diffs);

    diffs = diffList(new Diff(DELETE, "a"), new Diff(INSERT, "b"), new Diff(EQUAL, "cd"), new Diff(DELETE, "e"));
    dmp.diff_cleanupSemantic(diffs);
    assertEquals("diff_cleanupSemantic: No elimination.", diffList(new Diff(DELETE, "a"), new Diff(INSERT, "b"), new Diff(EQUAL, "cd"), new Diff(DELETE, "e")), diffs);

    diffs = diffList(new Diff(DELETE, "a"), new Diff(EQUAL, "b"), new Diff(DELETE, "c"));
    dmp.diff_cleanupSemantic(diffs);
    assertEquals("diff_cleanupSemantic: Simple elimination.", diffList(new Diff(DELETE, "abc"), new Diff(INSERT, "b")), diffs);

    diffs = diffList(new Diff(DELETE, "ab"), new Diff(EQUAL, "cd"), new Diff(DELETE, "e"), new Diff(EQUAL, "f"), new Diff(INSERT, "g"));
    dmp.diff_cleanupSemantic(diffs);
    assertEquals("diff_cleanupSemantic: Backpass elimination.", diffList(new Diff(DELETE, "abcdef"), new Diff(INSERT, "cdfg")), diffs);

    diffs = diffList(new Diff(INSERT, "1"), new Diff(EQUAL, "A"), new Diff(DELETE, "B"), new Diff(INSERT, "2"), new Diff(EQUAL, "_"), new Diff(INSERT, "1"), new Diff(EQUAL, "A"), new Diff(DELETE, "B"), new Diff(INSERT, "2"));
    dmp.diff_cleanupSemantic(diffs);
    assertEquals("diff_cleanupSemantic: Multiple elimination.", diffList(new Diff(DELETE, "AB_AB"), new Diff(INSERT, "1A2_1A2")), diffs);

    diffs = diffList(new Diff(EQUAL, "The c"), new Diff(DELETE, "ow and the c"), new Diff(EQUAL, "at."));
    dmp.diff_cleanupSemantic(diffs);
    assertEquals("diff_cleanupSemantic: Word boundaries.", diffList(new Diff(EQUAL, "The "), new Diff(DELETE, "cow and the "), new Diff(EQUAL, "cat.")), diffs);
  }

  public void testDiffCleanupEfficiency() {
    // Cleanup operationally trivial equalities
    dmp.Diff_EditCost = 4;
    LinkedList<Diff> diffs = diffList();
    dmp.diff_cleanupEfficiency(diffs);
    assertEquals("diff_cleanupEfficiency: Null case.", diffList(), diffs);

    diffs = diffList(new Diff(DELETE, "ab"), new Diff(INSERT, "12"), new Diff(EQUAL, "wxyz"), new Diff(DELETE, "cd"), new Diff(INSERT, "34"));
    dmp.diff_cleanupEfficiency(diffs);
    assertEquals("diff_cleanupEfficiency: No elimination.", diffList(new Diff(DELETE, "ab"), new Diff(INSERT, "12"), new Diff(EQUAL, "wxyz"), new Diff(DELETE, "cd"), new Diff(INSERT, "34")), diffs);

    diffs = diffList(new Diff(DELETE, "ab"), new Diff(INSERT, "12"), new Diff(EQUAL, "xyz"), new Diff(DELETE, "cd"), new Diff(INSERT, "34"));
    dmp.diff_cleanupEfficiency(diffs);
    assertEquals("diff_cleanupEfficiency: Four-edit elimination.", diffList(new Diff(DELETE, "abxyzcd"), new Diff(INSERT, "12xyz34")), diffs);

    diffs = diffList(new Diff(INSERT, "12"), new Diff(EQUAL, "x"), new Diff(DELETE, "cd"), new Diff(INSERT, "34"));
    dmp.diff_cleanupEfficiency(diffs);
    assertEquals("diff_cleanupEfficiency: Three-edit elimination.", diffList(new Diff(DELETE, "xcd"), new Diff(INSERT, "12x34")), diffs);

    diffs = diffList(new Diff(DELETE, "ab"), new Diff(INSERT, "12"), new Diff(EQUAL, "xy"), new Diff(INSERT, "34"), new Diff(EQUAL, "z"), new Diff(DELETE, "cd"), new Diff(INSERT, "56"));
    dmp.diff_cleanupEfficiency(diffs);
    assertEquals("diff_cleanupEfficiency: Backpass elimination.", diffList(new Diff(DELETE, "abxyzcd"), new Diff(INSERT, "12xy34z56")), diffs);

    dmp.Diff_EditCost = 5;
    diffs = diffList(new Diff(DELETE, "ab"), new Diff(INSERT, "12"), new Diff(EQUAL, "wxyz"), new Diff(DELETE, "cd"), new Diff(INSERT, "34"));
    dmp.diff_cleanupEfficiency(diffs);
    assertEquals("diff_cleanupEfficiency: High cost elimination.", diffList(new Diff(DELETE, "abwxyzcd"), new Diff(INSERT, "12wxyz34")), diffs);
    dmp.Diff_EditCost = 4;
  }

  public void testDiffPrettyHtml() {
    // Pretty print
    LinkedList<Diff> diffs = diffList(new Diff(EQUAL, "a\n"), new Diff(DELETE, "<B>b</B>"), new Diff(INSERT, "c&d"));
    assertEquals("diff_prettyHtml:", "<SPAN TITLE=\"i=0\">a&para;<BR></SPAN><DEL STYLE=\"background:#FFE6E6;\" TITLE=\"i=2\">&lt;B&gt;b&lt;/B&gt;</DEL><INS STYLE=\"background:#E6FFE6;\" TITLE=\"i=2\">c&amp;d</INS>", dmp.diff_prettyHtml(diffs));
  }

  public void testDiffText() {
    // Compute the source and destination texts
    LinkedList<Diff> diffs = diffList(new Diff(EQUAL, "jump"), new Diff(DELETE, "s"), new Diff(INSERT, "ed"), new Diff(EQUAL, " over "), new Diff(DELETE, "the"), new Diff(INSERT, "a"), new Diff(EQUAL, " lazy"));
    assertEquals("diff_text1:", "jumps over the lazy", dmp.diff_text1(diffs));
    assertEquals("diff_text2:", "jumped over a lazy", dmp.diff_text2(diffs));
  }

  public void testDiffDelta() {
    // Convert a diff into delta string
    LinkedList<Diff> diffs = diffList(new Diff(EQUAL, "jump"), new Diff(DELETE, "s"), new Diff(INSERT, "ed"), new Diff(EQUAL, " over "), new Diff(DELETE, "the"), new Diff(INSERT, "a"), new Diff(EQUAL, " lazy"), new Diff(INSERT, "old dog"));
    String text1 = dmp.diff_text1(diffs);
    assertEquals("diff_text1: Base text.", "jumps over the lazy", text1);

    String delta = dmp.diff_toDelta(diffs);
    assertEquals("diff_toDelta:", "=4\t-1\t+ed\t=6\t-3\t+a\t=5\t+old dog", delta);

    // Convert delta string into a diff
    assertEquals("diff_fromDelta: Normal.", diffs, dmp.diff_fromDelta(text1, delta));

    // Generates error (19 < 20).
    try {
      dmp.diff_fromDelta(text1 + "x", delta);
      fail("diff_fromDelta: Too long.");
    } catch (IllegalArgumentException ex) {
      // Exception expected.
    }

    // Generates error (19 > 18).
    try {
      dmp.diff_fromDelta(text1.substring(1), delta);
      fail("diff_fromDelta: Too short.");
    } catch (IllegalArgumentException ex) {
      // Exception expected.
    }

    // Generates error (%c3%xy invalid Unicode).
    try {
      dmp.diff_fromDelta("", "+%c3%xy");
      fail("diff_fromDelta: Invalid character.");
    } catch (IllegalArgumentException ex) {
      // Exception expected.
    }

    // Test deltas with special characters
    diffs = diffList(new Diff(EQUAL, "\u0680 \000 \t %"), new Diff(DELETE, "\u0681 \001 \n ^"), new Diff(INSERT, "\u0682 \002 \\ |"));
    text1 = dmp.diff_text1(diffs);
    assertEquals("diff_text1: Unicode text.", "\u0680 \000 \t %\u0681 \001 \n ^", text1);

    delta = dmp.diff_toDelta(diffs);
    assertEquals("diff_toDelta: Unicode.", "=7\t-7\t+%DA%82 %02 %5C %7C", delta);

    assertEquals("diff_fromDelta: Unicode.", diffs, dmp.diff_fromDelta(text1, delta));

    // Verify pool of unchanged characters
    diffs = diffList(new Diff(INSERT, "A-Z a-z 0-9 - _ . ! ~ * ' ( ) ; / ? : @ & = + $ , # "));
    String text2 = dmp.diff_text2(diffs);
    assertEquals("diff_text2: Unchanged characters.", "A-Z a-z 0-9 - _ . ! ~ * \' ( ) ; / ? : @ & = + $ , # ", text2);

    delta = dmp.diff_toDelta(diffs);
    assertEquals("diff_toDelta: Unchanged characters.", "+A-Z a-z 0-9 - _ . ! ~ * \' ( ) ; / ? : @ & = + $ , # ", delta);

    // Convert delta string into a diff
    assertEquals("diff_fromDelta: Unchanged characters.", diffs, dmp.diff_fromDelta("", delta));
  }

  public void testDiffXIndex() {
    // Translate a location in text1 to text2
    LinkedList<Diff> diffs = diffList(new Diff(DELETE, "a"), new Diff(INSERT, "1234"), new Diff(EQUAL, "xyz"));
    assertEquals("diff_xIndex: Translation on equality.", 5, dmp.diff_xIndex(diffs, 2));

    diffs = diffList(new Diff(EQUAL, "a"), new Diff(DELETE, "1234"), new Diff(EQUAL, "xyz"));
    assertEquals("diff_xIndex: Translation on deletion.", 1, dmp.diff_xIndex(diffs, 3));
  }

  public void testDiffPath() {
    // First, check footprints are different.
    assertTrue("diff_footprint:", dmp.diff_footprint(1, 10) != dmp.diff_footprint(10, 1));

    // Single letters
    // Trace a path from back to front.
    List<Set<Long>> v_map;
    Set<Long> row_set;
    v_map = new ArrayList<Set<Long>>();
    {
      row_set = new HashSet<Long>();
      row_set.add(dmp.diff_footprint(0, 0));
      v_map.add(row_set);
      row_set = new HashSet<Long>();
      row_set.add(dmp.diff_footprint(0, 1));
      row_set.add(dmp.diff_footprint(1, 0));
      v_map.add(row_set);
      row_set = new HashSet<Long>();
      row_set.add(dmp.diff_footprint(0, 2));
      row_set.add(dmp.diff_footprint(2, 0));
      row_set.add(dmp.diff_footprint(2, 2));
      v_map.add(row_set);
      row_set = new HashSet<Long>();
      row_set.add(dmp.diff_footprint(0, 3));
      row_set.add(dmp.diff_footprint(2, 3));
      row_set.add(dmp.diff_footprint(3, 0));
      row_set.add(dmp.diff_footprint(4, 3));
      v_map.add(row_set);
      row_set = new HashSet<Long>();
      row_set.add(dmp.diff_footprint(0, 4));
      row_set.add(dmp.diff_footprint(2, 4));
      row_set.add(dmp.diff_footprint(4, 0));
      row_set.add(dmp.diff_footprint(4, 4));
      row_set.add(dmp.diff_footprint(5, 3));
      v_map.add(row_set);
      row_set = new HashSet<Long>();
      row_set.add(dmp.diff_footprint(0, 5));
      row_set.add(dmp.diff_footprint(2, 5));
      row_set.add(dmp.diff_footprint(4, 5));
      row_set.add(dmp.diff_footprint(5, 0));
      row_set.add(dmp.diff_footprint(6, 3));
      row_set.add(dmp.diff_footprint(6, 5));
      v_map.add(row_set);
      row_set = new HashSet<Long>();
      row_set.add(dmp.diff_footprint(0, 6));
      row_set.add(dmp.diff_footprint(2, 6));
      row_set.add(dmp.diff_footprint(4, 6));
      row_set.add(dmp.diff_footprint(6, 6));
      row_set.add(dmp.diff_footprint(7, 5));
      v_map.add(row_set);
    }
    LinkedList<Diff> diffs = diffList(new Diff(INSERT, "W"), new Diff(DELETE, "A"), new Diff(EQUAL, "1"), new Diff(DELETE, "B"), new Diff(EQUAL, "2"), new Diff(INSERT, "X"), new Diff(DELETE, "C"), new Diff(EQUAL, "3"), new Diff(DELETE, "D"));
    assertEquals("diff_path1: Single letters.", diffs, dmp.diff_path1(v_map, "A1B2C3D", "W12X3"));

    // Trace a path from front to back.
    v_map.remove(v_map.size() - 1);
    diffs = diffList(new Diff(EQUAL, "4"), new Diff(DELETE, "E"), new Diff(INSERT, "Y"), new Diff(EQUAL, "5"), new Diff(DELETE, "F"), new Diff(EQUAL, "6"), new Diff(DELETE, "G"), new Diff(INSERT, "Z"));
    assertEquals("diff_path2: Single letters.", diffs, dmp.diff_path2(v_map, "4E5F6G", "4Y56Z"));

    // Double letters
    // Trace a path from back to front.
    v_map = new ArrayList<Set<Long>>();
    {
      row_set = new HashSet<Long>();
      row_set.add(dmp.diff_footprint(0, 0));
      v_map.add(row_set);
      row_set = new HashSet<Long>();
      row_set.add(dmp.diff_footprint(0, 1));
      row_set.add(dmp.diff_footprint(1, 0));
      v_map.add(row_set);
      row_set = new HashSet<Long>();
      row_set.add(dmp.diff_footprint(0, 2));
      row_set.add(dmp.diff_footprint(1, 1));
      row_set.add(dmp.diff_footprint(2, 0));
      v_map.add(row_set);
      row_set = new HashSet<Long>();
      row_set.add(dmp.diff_footprint(0, 3));
      row_set.add(dmp.diff_footprint(1, 2));
      row_set.add(dmp.diff_footprint(2, 1));
      row_set.add(dmp.diff_footprint(3, 0));
      v_map.add(row_set);
      row_set = new HashSet<Long>();
      row_set.add(dmp.diff_footprint(0, 4));
      row_set.add(dmp.diff_footprint(1, 3));
      row_set.add(dmp.diff_footprint(3, 1));
      row_set.add(dmp.diff_footprint(4, 0));
      row_set.add(dmp.diff_footprint(4, 4));
      v_map.add(row_set);
    }
    diffs = diffList(new Diff(INSERT, "WX"), new Diff(DELETE, "AB"), new Diff(EQUAL, "12"));
    assertEquals("diff_path1: Double letters.", diffs, dmp.diff_path1(v_map, "AB12", "WX12"));

    // Trace a path from front to back.
    v_map = new ArrayList<Set<Long>>();
    {
      row_set = new HashSet<Long>();
      row_set.add(dmp.diff_footprint(0, 0));
      v_map.add(row_set);
      row_set = new HashSet<Long>();
      row_set.add(dmp.diff_footprint(0, 1));
      row_set.add(dmp.diff_footprint(1, 0));
      v_map.add(row_set);
      row_set = new HashSet<Long>();
      row_set.add(dmp.diff_footprint(1, 1));
      row_set.add(dmp.diff_footprint(2, 0));
      row_set.add(dmp.diff_footprint(2, 4));
      v_map.add(row_set);
      row_set = new HashSet<Long>();
      row_set.add(dmp.diff_footprint(2, 1));
      row_set.add(dmp.diff_footprint(2, 5));
      row_set.add(dmp.diff_footprint(3, 0));
      row_set.add(dmp.diff_footprint(3, 4));
      v_map.add(row_set);
      row_set = new HashSet<Long>();
      row_set.add(dmp.diff_footprint(2, 6));
      row_set.add(dmp.diff_footprint(3, 5));
      row_set.add(dmp.diff_footprint(4, 4));
      v_map.add(row_set);
    }
    diffs = diffList(new Diff(DELETE, "CD"), new Diff(EQUAL, "34"), new Diff(INSERT, "YZ"));
    assertEquals("diff_path2: Double letters.", diffs, dmp.diff_path2(v_map, "CD34", "34YZ"));
  }

  public void testDiffMain() {
    // Perform a trivial diff
    LinkedList<Diff> diffs = diffList(new Diff(EQUAL, "abc"));
    assertEquals("diff_main: Null case.", diffs, dmp.diff_main("abc", "abc", false));

    diffs = diffList(new Diff(EQUAL, "ab"), new Diff(INSERT, "123"), new Diff(EQUAL, "c"));
    assertEquals("diff_main: Simple insertion.", diffs, dmp.diff_main("abc", "ab123c", false));

    diffs = diffList(new Diff(EQUAL, "a"), new Diff(DELETE, "123"), new Diff(EQUAL, "bc"));
    assertEquals("diff_main: Simple deletion.", diffs, dmp.diff_main("a123bc", "abc", false));

    diffs = diffList(new Diff(EQUAL, "a"), new Diff(INSERT, "123"), new Diff(EQUAL, "b"), new Diff(INSERT, "456"), new Diff(EQUAL, "c"));
    assertEquals("diff_main: Two insertions.", diffs, dmp.diff_main("abc", "a123b456c", false));

    diffs = diffList(new Diff(EQUAL, "a"), new Diff(DELETE, "123"), new Diff(EQUAL, "b"), new Diff(DELETE, "456"), new Diff(EQUAL, "c"));
    assertEquals("diff_main: Two deletions.", diffs, dmp.diff_main("a123b456c", "abc", false));

    // Perform a real diff
    // Switch off the timeout.
    dmp.Diff_Timeout = 0;
    dmp.Diff_DualThreshold = 32;
    diffs = diffList(new Diff(DELETE, "a"), new Diff(INSERT, "b"));
    assertEquals("diff_main: Simple case #1.", diffs, dmp.diff_main("a", "b", false));

    diffs = diffList(new Diff(DELETE, "Apple"), new Diff(INSERT, "Banana"), new Diff(EQUAL, "s are a"), new Diff(INSERT, "lso"), new Diff(EQUAL, " fruit."));
    assertEquals("diff_main: Simple case #2.", diffs, dmp.diff_main("Apples are a fruit.", "Bananas are also fruit.", false));

    diffs = diffList(new Diff(DELETE, "a"), new Diff(INSERT, "\u0680"), new Diff(EQUAL, "x"), new Diff(DELETE, "\t"), new Diff(INSERT, "\000"));
    assertEquals("diff_main: Simple case #3.", diffs, dmp.diff_main("ax\t", "\u0680x\000", false));

    diffs = diffList(new Diff(DELETE, "1"), new Diff(EQUAL, "a"), new Diff(DELETE, "y"), new Diff(EQUAL, "b"), new Diff(DELETE, "2"), new Diff(INSERT, "xab"));
    assertEquals("diff_main: Overlap #1.", diffs, dmp.diff_main("1ayb2", "abxab", false));

    diffs = diffList(new Diff(INSERT, "xaxcx"), new Diff(EQUAL, "abc"), new Diff(DELETE, "y"));
    assertEquals("diff_main: Overlap #2.", diffs, dmp.diff_main("abcy", "xaxcxabc", false));

    // Sub-optimal double-ended diff.
    dmp.Diff_DualThreshold = 2;
    diffs = diffList(new Diff(INSERT, "x"), new Diff(EQUAL, "a"), new Diff(DELETE, "b"), new Diff(INSERT, "x"), new Diff(EQUAL, "c"), new Diff(DELETE, "y"), new Diff(INSERT, "xabc"));
    assertEquals("diff_main: Overlap #3.", diffs, dmp.diff_main("abcy", "xaxcxabc", false));

    dmp.Diff_DualThreshold = 32;
    dmp.Diff_Timeout = 0.001f;  // 1ms
    // This test may 'fail' on extremely fast computers.  If so, just increase the text lengths.
    assertNull("diff_main: Timeout.", dmp.diff_map("`Twas brillig, and the slithy toves\nDid gyre and gimble in the wabe:\nAll mimsy were the borogoves,\nAnd the mome raths outgrabe.", "I am the very model of a modern major general,\nI've information vegetable, animal, and mineral,\nI know the kings of England, and I quote the fights historical,\nFrom Marathon to Waterloo, in order categorical."));
    dmp.Diff_Timeout = 0;

    // Test the linemode speedup
    // Must be long to pass the 200 char cutoff.
    String a = "1234567890\n1234567890\n1234567890\n1234567890\n1234567890\n1234567890\n1234567890\n1234567890\n1234567890\n1234567890\n1234567890\n1234567890\n1234567890\n";
    String b = "abcdefghij\nabcdefghij\nabcdefghij\nabcdefghij\nabcdefghij\nabcdefghij\nabcdefghij\nabcdefghij\nabcdefghij\nabcdefghij\nabcdefghij\nabcdefghij\nabcdefghij\n";
    assertEquals("diff_main: Simple.", dmp.diff_main(a, b, true), dmp.diff_main(a, b, false));

    a = "1234567890\n1234567890\n1234567890\n1234567890\n1234567890\n1234567890\n1234567890\n1234567890\n1234567890\n1234567890\n1234567890\n1234567890\n1234567890\n";
    b = "abcdefghij\n1234567890\n1234567890\n1234567890\nabcdefghij\n1234567890\n1234567890\n1234567890\nabcdefghij\n1234567890\n1234567890\n1234567890\nabcdefghij\n";
    String[] texts_linemode = diff_rebuildtexts(dmp.diff_main(a, b, true));
    String[] texts_textmode = diff_rebuildtexts(dmp.diff_main(a, b, false));
    assertArrayEquals("diff_main: Overlap.", texts_textmode, texts_linemode);
  }


  //  MATCH TEST FUNCTIONS


  public void testMatchAlphabet() {
    // Initialise the bitmasks for Bitap
    Map<Character, Integer> bitmask;
    bitmask = new HashMap<Character, Integer>();
    bitmask.put('a', 4); bitmask.put('b', 2); bitmask.put('c', 1);
    assertEquals("match_alphabet: Unique.", bitmask, dmp.match_alphabet("abc"));

    bitmask = new HashMap<Character, Integer>();
    bitmask.put('a', 37); bitmask.put('b', 18); bitmask.put('c', 8);
    assertEquals("match_alphabet: Duplicates.", bitmask, dmp.match_alphabet("abcaba"));
  }

  public void testMatchBitap() {
    // Bitap algorithm
    dmp.Match_Balance = 0.5f;
    dmp.Match_Threshold = 0.5f;
    dmp.Match_MinLength = 100;
    dmp.Match_MaxLength = 1000;
    assertEquals("match_bitap: Exact match #1.", 5, dmp.match_bitap("abcdefghijk", "fgh", 5));

    assertEquals("match_bitap: Exact match #2.", 5, dmp.match_bitap("abcdefghijk", "fgh", 0));

    assertEquals("match_bitap: Fuzzy match #1.", 4, dmp.match_bitap("abcdefghijk", "efxhi", 0));

    assertEquals("match_bitap: Fuzzy match #2.", 2, dmp.match_bitap("abcdefghijk", "cdefxyhijk", 5));

    assertEquals("match_bitap: Fuzzy match #3.", -1, dmp.match_bitap("abcdefghijk", "bxy", 1));

    assertEquals("match_bitap: Overflow.", 2, dmp.match_bitap("123456789xx0", "3456789x0", 2));

    dmp.Match_Threshold = 0.75f;
    assertEquals("match_bitap: Threshold #1.", 4, dmp.match_bitap("abcdefghijk", "efxyhi", 1));

    dmp.Match_Threshold = 0.1f;
    assertEquals("match_bitap: Threshold #2.", 1, dmp.match_bitap("abcdefghijk", "bcdef", 1));

    dmp.Match_Threshold = 0.5f;
    assertEquals("match_bitap: Multiple select #1.", 0, dmp.match_bitap("abcdexyzabcde", "abccde", 3));

    assertEquals("match_bitap: Multiple select #2.", 8, dmp.match_bitap("abcdexyzabcde", "abccde", 5));

    dmp.Match_Balance = 0.6f;  // Strict location, loose accuracy.
    assertEquals("match_bitap: Balance test #1.", -1, dmp.match_bitap("abcdefghijklmnopqrstuvwxyz", "abcdefg", 24));

    assertEquals("match_bitap: Balance test #2.", 0, dmp.match_bitap("abcdefghijklmnopqrstuvwxyz", "abcxdxexfgh", 1));

    dmp.Match_Balance = 0.4f;  // Strict accuracy, loose location.
    assertEquals("match_bitap: Balance test #3.", 0, dmp.match_bitap("abcdefghijklmnopqrstuvwxyz", "abcdefg", 24));

    assertEquals("match_bitap: Balance test #4.", -1, dmp.match_bitap("abcdefghijklmnopqrstuvwxyz", "abcxdxexfgh", 1));
    dmp.Match_Balance = 0.5f;
  }

  public void testMatchMain() {
    // Full match
    assertEquals("match_main: Equality.", 0, dmp.match_main("abcdef", "abcdef", 1000));

    assertEquals("match_main: Null text.", -1, dmp.match_main("", "abcdef", 1));

    assertEquals("match_main: Null pattern.", 3, dmp.match_main("abcdef", "", 3));

    assertEquals("match_main: Exact match.", 3, dmp.match_main("abcdef", "de", 3));

    dmp.Match_Threshold = 0.7f;
    assertEquals("match_main: Complex match.", 4, dmp.match_main("I am the very model of a modern major general.", " that berry ", 5));
    dmp.Match_Threshold = 0.5f;
  }


  //  PATCH TEST FUNCTIONS


  public void testPatchObj() {
    // Patch Object
    Patch p = new Patch();
    p.start1 = 20;
    p.start2 = 21;
    p.length1 = 18;
    p.length2 = 17;
    p.diffs = diffList(new Diff(EQUAL, "jump"), new Diff(DELETE, "s"), new Diff(INSERT, "ed"), new Diff(EQUAL, " over "), new Diff(DELETE, "the"), new Diff(INSERT, "a"), new Diff(EQUAL, "\nlaz"));
    String strp = "@@ -21,18 +22,17 @@\n jump\n-s\n+ed\n  over \n-the\n+a\n %0Alaz\n";
    assertEquals("Patch: toString.", strp, p.toString());
  }

  public void testPatchFromText() {
    assertTrue("patch_fromText: #0.", dmp.patch_fromText("").isEmpty());

    String strp = "@@ -21,18 +22,17 @@\n jump\n-s\n+ed\n  over \n-the\n+a\n %0Alaz\n";
    assertEquals("patch_fromText: #1.", strp, dmp.patch_fromText(strp).get(0).toString());

    assertEquals("patch_fromText: #2.", "@@ -1 +1 @@\n-a\n+b\n", dmp.patch_fromText("@@ -1 +1 @@\n-a\n+b\n").get(0).toString());

    assertEquals("patch_fromText: #3.", "@@ -1,3 +0,0 @@\n-abc\n", dmp.patch_fromText("@@ -1,3 +0,0 @@\n-abc\n").get(0).toString());

    assertEquals("patch_fromText: #4.", "@@ -0,0 +1,3 @@\n+abc\n", dmp.patch_fromText("@@ -0,0 +1,3 @@\n+abc\n").get(0).toString());

    // Generates error.
    try {
      dmp.patch_fromText("Bad\nPatch\n");
      fail("patch_fromText: #5.");
    } catch (IllegalArgumentException ex) {
      // Exception expected.
    }
  }

  public void testPatchToText() {
    String strp = "@@ -21,18 +22,17 @@\n jump\n-s\n+ed\n  over \n-the\n+a\n  laz\n";
    List<Patch> patches;
    patches = dmp.patch_fromText(strp);
    assertEquals("patch_toText: Single", strp, dmp.patch_toText(patches));

    strp = "@@ -1,9 +1,9 @@\n-f\n+F\n oo+fooba\n@@ -7,9 +7,9 @@\n obar\n-,\n+.\n  tes\n";
    patches = dmp.patch_fromText(strp);
    assertEquals("patch_toText: Dual", strp, dmp.patch_toText(patches));
  }

  public void testPatchAddContext() {
    dmp.Patch_Margin = 4;
    Patch p;
    p = dmp.patch_fromText("@@ -21,4 +21,10 @@\n-jump\n+somersault\n").get(0);
    dmp.patch_addContext(p, "The quick brown fox jumps over the lazy dog.");
    assertEquals("patch_addContext: Simple case.", "@@ -17,12 +17,18 @@\n fox \n-jump\n+somersault\n s ov\n", p.toString());

    p = dmp.patch_fromText("@@ -21,4 +21,10 @@\n-jump\n+somersault\n").get(0);
    dmp.patch_addContext(p, "The quick brown fox jumps.");
    assertEquals("patch_addContext: Not enough trailing context.", "@@ -17,10 +17,16 @@\n fox \n-jump\n+somersault\n s.\n", p.toString());

    p = dmp.patch_fromText("@@ -3 +3,2 @@\n-e\n+at\n").get(0);
    dmp.patch_addContext(p, "The quick brown fox jumps.");
    assertEquals("patch_addContext: Not enough leading context.", "@@ -1,7 +1,8 @@\n Th\n-e\n+at\n  qui\n", p.toString());

    p = dmp.patch_fromText("@@ -3 +3,2 @@\n-e\n+at\n").get(0);
    dmp.patch_addContext(p, "The quick brown fox jumps.  The quick brown fox crashes.");
    assertEquals("patch_addContext: Ambiguity.", "@@ -1,27 +1,28 @@\n Th\n-e\n+at\n  quick brown fox jumps. \n", p.toString());
  }

  public void testPatchMake() {
    LinkedList<Patch> patches;
    String text1 = "The quick brown fox jumps over the lazy dog.";
    String text2 = "That quick brown fox jumped over a lazy dog.";
    LinkedList<Diff> diffs = dmp.diff_main(text1, text2, false);
    String expectedPatch = "@@ -1,11 +1,12 @@\n Th\n-e\n+at\n  quick b\n@@ -21,18 +22,17 @@\n jump\n-s\n+ed\n  over \n-the\n+a\n  laz\n";
    patches = dmp.patch_make(text1, text2);
    assertEquals("patch_make: Text1+Text2 inputs", expectedPatch, dmp.patch_toText(patches));

    patches = dmp.patch_make(diffs);
    assertEquals("patch_make: Diff input", expectedPatch, dmp.patch_toText(patches));

    patches = dmp.patch_make(text1, diffs);
    assertEquals("patch_make: Text1+Diff inputs", expectedPatch, dmp.patch_toText(patches));

    patches = dmp.patch_make(text1, text2, diffs);
    assertEquals("patch_make: Text1+Text2+Diff inputs (deprecated)", expectedPatch, dmp.patch_toText(patches));

    patches = dmp.patch_make("`1234567890-=[]\\;',./", "~!@#$%^&*()_+{}|:\"<>?");
    assertEquals("patch_toString: Character encoding.", "@@ -1,21 +1,21 @@\n-%601234567890-=%5B%5D%5C;',./\n+~!@#$%25%5E&*()_+%7B%7D%7C:%22%3C%3E?\n", dmp.patch_toText(patches));

    diffs = diffList(new Diff(DELETE, "`1234567890-=[]\\;',./"), new Diff(INSERT, "~!@#$%^&*()_+{}|:\"<>?"));
    assertEquals("patch_fromText: Character decoding.", diffs, dmp.patch_fromText("@@ -1,21 +1,21 @@\n-%601234567890-=%5B%5D%5C;',./\n+~!@#$%25%5E&*()_+%7B%7D%7C:%22%3C%3E?\n").get(0).diffs);
  }

  public void testPatchSplitMax() {
    // Assumes that Match_MaxBits is 32.
    LinkedList<Patch> patches;
    patches = dmp.patch_make("abcdef1234567890123456789012345678901234567890123456789012345678901234567890uvwxyz", "abcdefuvwxyz");
    dmp.patch_splitMax(patches);
    assertEquals("patch_splitMax: #1.", "@@ -3,32 +3,8 @@\n cdef\n-123456789012345678901234\n 5678\n@@ -27,32 +3,8 @@\n cdef\n-567890123456789012345678\n 9012\n@@ -51,30 +3,8 @@\n cdef\n-9012345678901234567890\n uvwx\n", dmp.patch_toText(patches));

    patches = dmp.patch_make("1234567890123456789012345678901234567890123456789012345678901234567890", "abc");
    dmp.patch_splitMax(patches);
    assertEquals("patch_splitMax: #2.", "@@ -1,32 +1,4 @@\n-1234567890123456789012345678\n 9012\n@@ -29,32 +1,4 @@\n-9012345678901234567890123456\n 7890\n@@ -57,14 +1,3 @@\n-78901234567890\n+abc\n", dmp.patch_toText(patches));

    patches = dmp.patch_make("abcdefghij , h : 0 , t : 1 abcdefghij , h : 0 , t : 1 abcdefghij , h : 0 , t : 1", "abcdefghij , h : 1 , t : 1 abcdefghij , h : 1 , t : 1 abcdefghij , h : 0 , t : 1");
    dmp.patch_splitMax(patches);
    assertEquals("patch_splitMax: #3.", "@@ -2,32 +2,32 @@\n bcdefghij , h : \n-0\n+1\n  , t : 1 abcdef\n@@ -29,32 +29,32 @@\n bcdefghij , h : \n-0\n+1\n  , t : 1 abcdef\n", dmp.patch_toText(patches));
  }

  public void testPatchAddPadding() {
    LinkedList<Patch> patches;
    patches = dmp.patch_make("", "test");
    assertEquals("patch_addPadding: Both edges full.", "@@ -0,0 +1,4 @@\n+test\n", dmp.patch_toText(patches));
    dmp.patch_addPadding(patches);
    assertEquals("patch_addPadding: Both edges full.", "@@ -1,8 +1,12 @@\n %00%01%02%03\n+test\n %00%01%02%03\n", dmp.patch_toText(patches));

    patches = dmp.patch_make("XY", "XtestY");
    assertEquals("patch_addPadding: Both edges partial.", "@@ -1,2 +1,6 @@\n X\n+test\n Y\n", dmp.patch_toText(patches));
    dmp.patch_addPadding(patches);
    assertEquals("patch_addPadding: Both edges partial.", "@@ -2,8 +2,12 @@\n %01%02%03X\n+test\n Y%00%01%02\n", dmp.patch_toText(patches));

    patches = dmp.patch_make("XXXXYYYY", "XXXXtestYYYY");
    assertEquals("patch_addPadding: Both edges none.", "@@ -1,8 +1,12 @@\n XXXX\n+test\n YYYY\n", dmp.patch_toText(patches));
    dmp.patch_addPadding(patches);
    assertEquals("patch_addPadding: Both edges none.", "@@ -5,8 +5,12 @@\n XXXX\n+test\n YYYY\n", dmp.patch_toText(patches));
  }

  public void testPatchApply() {
    LinkedList<Patch> patches;
    patches = dmp.patch_make("The quick brown fox jumps over the lazy dog.", "That quick brown fox jumped over a lazy dog.");
    Object[] results = dmp.patch_apply(patches, "The quick brown fox jumps over the lazy dog.");
    boolean[] boolArray = (boolean[]) results[1];
    String resultStr = results[0] + "\t" + boolArray[0] + "\t" + boolArray[1];
    assertEquals("patch_apply: Exact match.", "That quick brown fox jumped over a lazy dog.\ttrue\ttrue", resultStr);

    results = dmp.patch_apply(patches, "The quick red rabbit jumps over the tired tiger.");
    boolArray = (boolean[]) results[1];
    resultStr = results[0] + "\t" + boolArray[0] + "\t" + boolArray[1];
    assertEquals("patch_apply: Partial match.", "That quick red rabbit jumped over a tired tiger.\ttrue\ttrue", resultStr);

    results = dmp.patch_apply(patches, "I am the very model of a modern major general.");
    boolArray = (boolean[]) results[1];
    resultStr = results[0] + "\t" + boolArray[0] + "\t" + boolArray[1];
    assertEquals("patch_apply: Failed match.", "I am the very model of a modern major general.\tfalse\tfalse", resultStr);

    patches = dmp.patch_make("", "test");
    String patchStr = dmp.patch_toText(patches);
    dmp.patch_apply(patches, "");
    assertEquals("patch_apply: No side effects.", patchStr, dmp.patch_toText(patches));

    patches = dmp.patch_make("", "test");
    results = dmp.patch_apply(patches, "");
    boolArray = (boolean[]) results[1];
    resultStr = results[0] + "\t" + boolArray[0];
    assertEquals("patch_apply: Edge exact match.", "test\ttrue", resultStr);

    patches = dmp.patch_make("XY", "XtestY");
    results = dmp.patch_apply(patches, "XY");
    boolArray = (boolean[]) results[1];
    resultStr = results[0] + "\t" + boolArray[0];
    assertEquals("patch_apply: Near edge exact match.", "XtestY\ttrue", resultStr);

    patches = dmp.patch_make("y", "y123");
    results = dmp.patch_apply(patches, "x");
    boolArray = (boolean[]) results[1];
    resultStr = results[0] + "\t" + boolArray[0];
    assertEquals("patch_apply: Edge partial match.", "x123\ttrue", resultStr);
  }


  private void assertArrayEquals(String error_msg, Object[] a, Object[] b) {
    List<Object> list_a = Arrays.asList(a);
    List<Object> list_b = Arrays.asList(b);
    assertEquals(error_msg, list_a, list_b);
  }

  // Construct the two texts which made up the diff originally.
  private static String[] diff_rebuildtexts(LinkedList<Diff> diffs) {
    String[] text = {"", ""};
    for (Diff myDiff : diffs) {
      if (myDiff.operation != diff_match_patch.Operation.INSERT) {
        text[0] += myDiff.text;
      }
      if (myDiff.operation != diff_match_patch.Operation.DELETE) {
        text[1] += myDiff.text;
      }
    }
    return text;
  }


  // Private function for quickly building lists of diffs.
  private static LinkedList<Diff> diffList(Diff... diffs) {
    LinkedList<Diff> myDiffList = new LinkedList<Diff>();
    for (Diff myDiff : diffs) {
      myDiffList.add(myDiff);
    }
    return myDiffList;
  }
}
