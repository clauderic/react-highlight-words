/* @flow */
import React, { PropTypes } from 'react'
import {Text} from 'react-native'
import * as Chunks from './utils.js'

Highlighter.propTypes = {
  autoEscape: PropTypes.bool,
  highlightStyle: Text.propTypes.style,
  searchWords: PropTypes.arrayOf(PropTypes.string).isRequired,
  textToHighlight: PropTypes.string.isRequired,
  sanitize: PropTypes.func
}

/**
 * Highlights all occurrences of search terms (searchText) within a string (textToHighlight).
 * This function returns an array of strings and <Text>s (wrapping highlighted words).
 */
export default function Highlighter ({
  autoEscape,
  highlightStyle,
  searchWords,
  textToHighlight,
  sanitize
}) {
  const chunks = Chunks.findAll(textToHighlight, searchWords, sanitize, autoEscape)

  return (
    <Text>
      {chunks.map((chunk, index) => {
        const text = textToHighlight.substr(chunk.start, chunk.end - chunk.start)

          return (
            <Text
              key={index}
              style={chunk.highlight && highlightStyle}
            >
              {text}
            </Text>
          )
      })}
    </Text>
  )
}
