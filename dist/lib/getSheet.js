"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_fetch_1 = __importDefault(require("node-fetch"));
function buildUrl(id, sheetNum, mode) {
    return "https://spreadsheets.google.com/feeds/" + mode + "/" + id + "/" + sheetNum + "/public/values?alt=json";
}
exports.buildUrl = buildUrl;
// Generic fetch and parse function
function fetchAndParse(id, sheetNum, type, parseEntries) {
    if (id.length === 0) {
        return Promise.reject(new Error('empty id'));
    }
    var url = buildUrl(id, sheetNum, type);
    return new Promise(function (resolve, reject) {
        node_fetch_1.default(url)
            .then(function (response) { return response.json(); })
            .then(function (json) {
            var data = parseEntries(json.feed.entry);
            var res = {
                title: json.feed.title.$t,
                updated: json.feed.updated.$t,
                data: data
            };
            resolve(res);
        })
            .catch(function (ex) {
            reject(ex);
        });
    });
}
function parseRawCells(entries) {
    var data = [];
    entries.forEach(function (cell) {
        var row = parseInt(cell.gs$cell.row, 10) - 1;
        var col = parseInt(cell.gs$cell.col, 10) - 1;
        var content = cell.gs$cell.$t;
        if (data[row] === undefined) {
            data[row] = [];
        }
        data[row][col] = content;
    });
    return data;
}
exports.parseRawCells = parseRawCells;
/**
 * Use for table with labels only for columns
 */
function parseEntry(entry) {
    var res = {};
    Object.keys(entry).forEach(function (key) {
        if (key.indexOf('gsx$') === 0) {
            var label = key.substr(4);
            res[label] = entry[key].$t;
        }
    });
    return res;
}
/**
 * Parser for table where just the columns are labeled
 * @return array of objects where the labels are keys
 */
function parseLabeledCols(entries) {
    return entries.map(function (entry) { return parseEntry(entry); });
}
exports.parseLabeledCols = parseLabeledCols;
/**
 * Use for table with labels for rows AND columns
 * Example input: "bar: 123, baz: 122, bab: 234"
 */
function parseLabeledRow(row) {
    var cols = row.split(', ');
    var res = {};
    var prevCol = null;
    cols.forEach(function (col, idx) {
        var pair = col.split(': ');
        if (pair.length === 2) {
            res[pair[0]] = pair[1];
            prevCol = pair[0];
        }
        else if (pair.length === 1 && prevCol) {
            res[prevCol] = res[prevCol] + ', ' + pair[0];
        }
        else {
            // noop
        }
    });
    return res;
}
/**
 * Parser for table where both rows and columns are labeled
 * @return object where keys are row labels and values are objects where keys are the column labels
 */
function parseLabeledRowsCols(entries) {
    var res = {};
    entries.forEach(function (entry) {
        res[entry.title.$t] = parseLabeledRow(entry.content.$t);
    });
    return res;
}
exports.parseLabeledRowsCols = parseLabeledRowsCols;
// fetch as raw arrays
function raw(id, sheetNum) {
    if (sheetNum === void 0) { sheetNum = 1; }
    return fetchAndParse(id, sheetNum, 'cells', parseRawCells);
}
exports.raw = raw;
// fetch as array of labeled columns
function labeledCols(id, sheetNum) {
    if (sheetNum === void 0) { sheetNum = 1; }
    return fetchAndParse(id, sheetNum, 'list', parseLabeledCols);
}
exports.labeledCols = labeledCols;
// fetch as labeled map of labeled columns
function labeledColsRows(id, sheetNum) {
    if (sheetNum === void 0) { sheetNum = 1; }
    return fetchAndParse(id, sheetNum, 'list', parseLabeledRowsCols);
}
exports.labeledColsRows = labeledColsRows;
exports.default = {
    raw: raw,
    labeledCols: labeledCols,
    labeledColsRows: labeledColsRows
};
