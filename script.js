/* ============================================================
   CONFIGURATION
============================================================ */

const API_URL =
    "https://script.google.com/macros/s/AKfycbzQyhLYE6VfpkfNh25SwghSXmXT892-Ulg5xZsEX3ph5TZqTobA65czubiKZdjHvIn_bw/exec";


/*
 * Backend currently allows 5 MB.
 */

const MAX_FILE_SIZE =
    5 * 1024 * 1024;


/* ============================================================
   URL PARAMETERS
============================================================ */

const params =
    new URLSearchParams(
        window.location.search
    );


/* ============================================================
   ULB INFORMATION
============================================================ */

const ulbName =
    params.get("ulbName") || "";

const ulbId =
    params.get("ulbId") || "";


/* ============================================================
   STATE MAPPING
============================================================ */

const STATE_MAP = {

    "STA000000001": "Gujarat",

    "STA000000004": "Maharashtra",

    "STA000000010": "Chattisgarh",

    "STA000000024": "Jharkhand"

};


const stateId =
    params.get("stateId") ||
    params.get("state") ||
    "";


const stateName =
    STATE_MAP[stateId] ||
    "";


/* ============================================================
   YEAR / FINANCIAL YEAR
============================================================ */

const year =
    params.get("year") || "";


/*
 * Example:
 *
 * year=2027
 *
 * becomes:
 *
 * 2025-26
 */

const financialYear =
    year &&
    !isNaN(Number(year))

        ? `${Number(year) - 2}-${String(Number(year) - 1).slice(-2)}`

        : "";


/* ============================================================
   OPTIONAL PARAMETERS
============================================================ */

const cityClass =
    params.get("cityClass") || "";

const login =
    params.get("login") || "";


/* ============================================================
   ELEMENTS
============================================================ */

const page2 =
    document.getElementById(
        "dp-2"
    );


const loginRequired =
    document.getElementById(
        "loginRequired"
    );


const headerUlbName =
    document.getElementById(
        "headerUlbName"
    );


const ulbDisplay2 =
    document.getElementById(
        "ulbDisplay2"
    );


const stateDisplay2 =
    document.getElementById(
        "stateDisplay2"
    );


const financialYearDisplay =
    document.getElementById(
        "financialYearDisplay"
    );


const fileInput =
    document.getElementById(
        "fileInput30"
    );


const error30 =
    document.getElementById(
        "error30"
    );


const successMessage =
    document.getElementById(
        "successMessage"
    );


const submitButton =
    document.getElementById(
        "submitButton"
    );


const declarationAccepted =
    document.getElementById(
        "declarationAccepted"
    );


const form =
    document.getElementById(
        "ut"
    );


const logoutButton =
    document.getElementById(
        "logoutButton"
    );


const customAlert =
    document.getElementById(
        "custom-alert"
    );


/* ============================================================
   SUBMITTED DOCUMENT ELEMENTS
============================================================ */

const submittedDocumentBox =
    document.getElementById(
        "submittedDocumentBox"
    );


const submittedDocumentTitle =
    document.getElementById(
        "submittedDocumentTitle"
    );


const submittedDocumentMessage =
    document.getElementById(
        "submittedDocumentMessage"
    );


const submittedSubmissionId =
    document.getElementById(
        "submittedSubmissionId"
    );


const submittedUlbName =
    document.getElementById(
        "submittedUlbName"
    );


const submittedStateName =
    document.getElementById(
        "submittedStateName"
    );


const submittedYear =
    document.getElementById(
        "submittedYear"
    );


const submittedFileName =
    document.getElementById(
        "submittedFileName"
    );


const submittedDocumentPreview =
    document.getElementById(
        "submittedDocumentPreview"
    );


const submittedDocumentDownload =
    document.getElementById(
        "submittedDocumentDownload"
    );


/* ============================================================
   DISPLAY INFORMATION
============================================================ */

if (headerUlbName) {

    headerUlbName.textContent =
        ulbName || "ULB";

}


if (ulbDisplay2) {

    ulbDisplay2.textContent =
        ulbName || "-";

}


if (stateDisplay2) {

    stateDisplay2.textContent =
        stateName ||
        stateId ||
        "-";

}


if (financialYearDisplay) {

    financialYearDisplay.textContent =
        financialYear || "-";

}


/* ============================================================
   CHECK ULB DATA
============================================================ */

const ulbDataFound =
    Boolean(

        ulbName &&
        ulbId &&
        stateId &&
        financialYear

    );


/* ============================================================
   SHOW LOGIN REQUIRED
============================================================ */

function showLoginRequired() {

    if (page2) {

        page2.style.display =
            "none";

    }


    if (loginRequired) {

        loginRequired.style.display =
            "flex";

    }


    if (customAlert) {

        customAlert.style.display =
            "none";

    }

}


/* ============================================================
   SHOW DECLARATION FORM
============================================================ */

function showDeclarationForm() {

    if (loginRequired) {

        loginRequired.style.display =
            "none";

    }


    if (page2) {

        page2.style.display =
            "block";

    }


    if (form) {

        form.style.display =
            "block";

    }


    if (submittedDocumentBox) {

        submittedDocumentBox.style.display =
            "none";

    }


    /*
     * Re-enable controls when declaration
     * is confirmed as not submitted.
     */

    if (fileInput) {

        fileInput.disabled =
            false;

    }


    if (declarationAccepted) {

        declarationAccepted.disabled =
            false;

    }


    if (submitButton) {

        submitButton.disabled =
            false;

        submitButton.textContent =
            "Submit";

    }

}


/* ============================================================
   SHOW SUBMITTED DECLARATION
============================================================ */

function showSubmittedDeclaration(
    result,
    isNewSubmission = false
) {

    /*
     * ----------------------------------------------------------
     * TITLE
     * ----------------------------------------------------------
     */

    if (submittedDocumentTitle) {

        submittedDocumentTitle.textContent =
            isNewSubmission

                ? "Declaration Submitted Successfully"

                : "Declaration Already Submitted";

    }


    /*
     * ----------------------------------------------------------
     * MESSAGE
     * ----------------------------------------------------------
     */

    if (submittedDocumentMessage) {

        submittedDocumentMessage.textContent =
            isNewSubmission

                ? "Your undertaking has been successfully submitted."

                : "Your undertaking has already been submitted for this ULB and financial year.";

    }


    /*
     * ----------------------------------------------------------
     * HIDE UPLOAD FORM
     * ----------------------------------------------------------
     */

    if (form) {

        form.style.display =
            "none";

    }


    if (successMessage) {

        successMessage.style.display =
            "none";

    }


    /*
     * ----------------------------------------------------------
     * SUBMISSION ID
     * ----------------------------------------------------------
     */

    if (submittedSubmissionId) {

        submittedSubmissionId.textContent =
            result.submissionId ||
            "-";

    }


    /*
     * ----------------------------------------------------------
     * ULB
     * ----------------------------------------------------------
     */

    if (submittedUlbName) {

        submittedUlbName.textContent =
            result.ulbName ||
            ulbName ||
            "-";

    }


    /*
     * ----------------------------------------------------------
     * STATE
     * ----------------------------------------------------------
     */

    if (submittedStateName) {

        submittedStateName.textContent =
            result.stateName ||
            stateName ||
            "-";

    }


    /*
     * ----------------------------------------------------------
     * FINANCIAL YEAR
     * ----------------------------------------------------------
     */

    if (submittedYear) {

        submittedYear.textContent =
            result.year ||
            financialYear ||
            "-";

    }


    /*
     * ----------------------------------------------------------
     * FILE NAME
     * ----------------------------------------------------------
     */

    if (submittedFileName) {

        submittedFileName.textContent =
            result.fileName ||
            "-";

    }


    /*
     * ==========================================================
     * PDF PREVIEW
     * ==========================================================
     */

    if (
        submittedDocumentPreview &&
        result.fileId
    ) {

        submittedDocumentPreview.src =
            "https://drive.google.com/file/d/" +
            encodeURIComponent(
                result.fileId
            ) +
            "/preview";

    }


    /*
    * ==========================================================
    * PDF DOWNLOAD BUTTON
    * ==========================================================
    */

    if (
        submittedDocumentDownload &&
        result.fileId
    ) {

        const downloadUrl =
            "https://drive.google.com/uc?export=download&id=" +
            encodeURIComponent(
                result.fileId
            );


        submittedDocumentDownload.href =
            downloadUrl;


        /*
        * Do NOT use target="_blank".
        *
        * The browser will handle the download
        * instead of opening the Drive preview.
        */

        submittedDocumentDownload.removeAttribute(
            "target"
        );


        submittedDocumentDownload.removeAttribute(
            "rel"
        );


        /*
        * Optional download filename.
        *
        * This tells the browser the preferred
        * downloaded filename.
        */

        submittedDocumentDownload.setAttribute(
            "download",
            result.fileName ||
            "HOD_Undertaking.pdf"
        );

    }


    /*
    * If no file ID exists, disable the download link.
    */

    if (
        submittedDocumentDownload &&
        !result.fileId
    ) {

        submittedDocumentDownload.removeAttribute(
            "href"
        );

        submittedDocumentDownload.removeAttribute(
            "download"
        );

        submittedDocumentDownload.style.pointerEvents =
            "none";

        submittedDocumentDownload.style.opacity =
            "0.6";

    }


    /*
     * ==========================================================
     * SHOW SUBMITTED DOCUMENT BOX
     * ==========================================================
     */

    if (submittedDocumentBox) {

        submittedDocumentBox.style.display =
            "block";


        setTimeout(

            function () {

                submittedDocumentBox.scrollIntoView({

                    behavior:
                        "smooth",

                    block:
                        "start"

                });

            },

            100

        );

    }


    /*
     * ==========================================================
     * KEEP PAGE VISIBLE
     * ==========================================================
     */

    if (page2) {

        page2.style.display =
            "block";

    }


    if (loginRequired) {

        loginRequired.style.display =
            "none";

    }


    /*
     * ==========================================================
     * DISABLE UPLOAD CONTROLS
     * ==========================================================
     */

    if (fileInput) {

        fileInput.disabled =
            true;

    }


    if (declarationAccepted) {

        declarationAccepted.disabled =
            true;

    }


    if (submitButton) {

        submitButton.disabled =
            true;

        submitButton.textContent =
            "Already Submitted";

    }

}


/* ============================================================
   CHECK EXISTING DECLARATION
============================================================ */

async function checkExistingDeclaration() {

    /*
     * Do not check if required ULB information
     * is missing.
     */

    if (!ulbDataFound) {

        showLoginRequired();

        return;

    }


    console.log(
        "Checking existing declaration..."
    );


    try {

        const payload = {

            action:
                "CHECK_DECLARATION",

            ulbId:
                ulbId,

            stateId:
                stateId,

            year:
                financialYear

        };


        const response =
            await fetch(

                API_URL,

                {

                    method:
                        "POST",

                    headers: {

                        "Content-Type":
                            "text/plain;charset=utf-8"

                    },

                    body:
                        JSON.stringify(
                            payload
                        )

                }

            );


        /*
         * HTTP error.
         */

        if (!response.ok) {

            throw new Error(

                "Server returned HTTP " +
                response.status

            );

        }


        const result =
            await response.json();


        console.log(
            "Declaration check response:",
            result
        );


        /*
         * ======================================================
         * EXISTING DECLARATION
         *
         * Backend response:
         *
         * {
         *   status: "Submitted",
         *   submitted: true,
         *   ...
         * }
         * ======================================================
         */

        if (
            result.submitted === true
        ) {

            console.log(
                "Declaration already submitted."
            );


            showSubmittedDeclaration(
                result,
                false
            );


            return;

        }


        /*
         * ======================================================
         * NO PREVIOUS DECLARATION
         *
         * Expected response:
         *
         * {
         *   status: "success",
         *   submitted: false
         * }
         * ======================================================
         */

        if (
            result.status === "success"
        ) {

            console.log(
                "No previous declaration found."
            );


            showDeclarationForm();


            return;

        }


        /*
         * ======================================================
         * UNKNOWN SERVER RESPONSE
         * ======================================================
         */

        throw new Error(

            result.message ||
            "Unable to determine declaration status."

        );

    }
    catch (error) {

        console.error(
            "Declaration check error:",
            error
        );


        /*
         * IMPORTANT:
         *
         * Do not silently pretend that
         * the check succeeded.
         *
         * However, keep the form available
         * so a temporary server problem does
         * not completely lock the user out.
         */

        showDeclarationForm();


        if (error30) {

            error30.textContent =
                "Unable to check previous declaration status. Please try again.";

            error30.style.display =
                "block";

        }

    }

}


/* ============================================================
   INITIAL PAGE DECISION
============================================================ */

if (!ulbDataFound) {

    console.warn(
        "ULB data not found."
    );


    showLoginRequired();

}
else {

    /*
     * Show the declaration page.
     */

    if (page2) {

        page2.style.display =
            "block";

    }


    /*
     * IMPORTANT:
     *
     * Do NOT immediately show the upload form.
     *
     * Hide it while CHECK_DECLARATION
     * is running.
     */

    if (form) {

        form.style.display =
            "none";

    }


    if (submittedDocumentBox) {

        submittedDocumentBox.style.display =
            "none";

    }


    /*
     * Check backend before allowing
     * declaration upload.
     */

    checkExistingDeclaration();

}


/* ============================================================
   FILE VALIDATION
============================================================ */

function validateFile(file) {

    if (error30) {

        error30.style.display =
            "none";

    }


    if (!file) {

        if (error30) {

            error30.textContent =
                "Please select the HOD undertaking PDF.";

            error30.style.display =
                "block";

        }

        return false;

    }


    const fileName =
        file.name.toLowerCase();


    const isPdf =
        file.type === "application/pdf" ||
        fileName.endsWith(".pdf");


    if (!isPdf) {

        if (error30) {

            error30.textContent =
                "Only PDF files are allowed.";

            error30.style.display =
                "block";

        }

        return false;

    }


    if (
        file.size >
        MAX_FILE_SIZE
    ) {

        if (error30) {

            error30.textContent =
                "The file size must be 5 MB or smaller.";

            error30.style.display =
                "block";

        }

        return false;

    }


    return true;

}


/* ============================================================
   FILE CHANGE
============================================================ */

if (fileInput) {

    fileInput.addEventListener(

        "change",

        function () {

            validateFile(
                this.files[0]
            );

        }

    );

}


/* ============================================================
   FILE TO BASE64
============================================================ */

function fileToBase64(file) {

    return new Promise(

        function (
            resolve,
            reject
        ) {

            const reader =
                new FileReader();


            reader.onload =
                function () {

                    const result =
                        reader.result;


                    if (!result) {

                        reject(

                            new Error(
                                "Unable to read the PDF file."
                            )

                        );

                        return;

                    }


                    const parts =
                        result.split(",");


                    if (
                        parts.length <
                        2
                    ) {

                        reject(

                            new Error(
                                "Unable to convert the PDF file."
                            )

                        );

                        return;

                    }


                    const base64 =
                        parts[1];


                    resolve(
                        base64
                    );

                };


            reader.onerror =
                function () {

                    reject(

                        new Error(
                            "Unable to read the PDF file."
                        )

                    );

                };


            reader.readAsDataURL(
                file
            );

        }

    );

}


/* ============================================================
   FORM SUBMIT
============================================================ */

if (form) {

    form.addEventListener(

        "submit",

        async function (event) {

            event.preventDefault();


            /*
             * Clear previous errors.
             */

            if (error30) {

                error30.style.display =
                    "none";

            }


            if (successMessage) {

                successMessage.style.display =
                    "none";

            }


            /*
             * ==================================================
             * CHECK ULB DATA
             * ==================================================
             */

            if (!ulbDataFound) {

                showLoginRequired();

                return;

            }


            /*
             * ==================================================
             * VALIDATE DECLARATION
             * ==================================================
             */

            if (
                !declarationAccepted ||
                !declarationAccepted.checked
            ) {

                if (error30) {

                    error30.textContent =
                        "Please accept the declaration before submitting.";

                    error30.style.display =
                        "block";

                }


                if (declarationAccepted) {

                    declarationAccepted.focus();

                }


                return;

            }


            /*
             * ==================================================
             * VALIDATE FILE
             * ==================================================
             */

            const file =
                fileInput
                    ? fileInput.files[0]
                    : null;


            if (
                !validateFile(file)
            ) {

                return;

            }


            /*
             * ==================================================
             * DISABLE SUBMIT BUTTON
             * ==================================================
             */

            if (submitButton) {

                submitButton.disabled =
                    true;

                submitButton.textContent =
                    "Submitting...";

            }


            try {

                /*
                 * ==================================================
                 * CONVERT PDF TO BASE64
                 * ==================================================
                 */

                const fileData =
                    await fileToBase64(
                        file
                    );


                /*
                 * ==================================================
                 * PREPARE PAYLOAD
                 * ==================================================
                 */

                const payload = {

                    action:
                        "DECLARATION_UPLOAD",

                    ulbId:
                        ulbId,

                    ulbName:
                        ulbName,

                    stateId:
                        stateId,

                    stateName:
                        stateName,

                    year:
                        financialYear,

                    fileName:
                        file.name,

                    fileData:
                        fileData,

                    declarationAccepted:
                        true,

                    cityClass:
                        cityClass,

                    login:
                        login

                };


                console.log(
                    "Declaration payload prepared."
                );


                /*
                 * ==================================================
                 * SEND TO GOOGLE APPS SCRIPT
                 * ==================================================
                 */

                const response =
                    await fetch(

                        API_URL,

                        {

                            method:
                                "POST",

                            headers: {

                                "Content-Type":
                                    "text/plain;charset=utf-8"

                            },

                            body:
                                JSON.stringify(
                                    payload
                                )

                        }

                    );


                /*
                 * ==================================================
                 * HTTP ERROR
                 * ==================================================
                 */

                if (!response.ok) {

                    throw new Error(

                        "Server returned HTTP " +
                        response.status

                    );

                }


                /*
                 * ==================================================
                 * READ RESPONSE
                 * ==================================================
                 */

                const result =
                    await response.json();


                console.log(
                    "Server response:",
                    result
                );


                /*
                 * ==================================================
                 * SUCCESSFUL SUBMISSION
                 *
                 * Your backend returns:
                 *
                 * status: "Submitted"
                 * submitted: true
                 *
                 * ==================================================
                 */

                if (
                    result.submitted === true ||
                    result.status === "Submitted"
                ) {

                    console.log(
                        "Declaration submitted successfully."
                    );


                    showSubmittedDeclaration(
                        result,
                        true
                    );


                    return;

                }


                /*
                 * ==================================================
                 * BACKEND ERROR
                 * ==================================================
                 */

                throw new Error(

                    result.message ||
                    "Submission failed."

                );

            }
            catch (error) {

                console.error(
                    "Submission error:",
                    error
                );


                /*
                 * ==================================================
                 * DUPLICATE SUBMISSION
                 *
                 * If backend rejects the upload because
                 * another submission already exists, check
                 * the backend again and show the stored file.
                 * ==================================================
                 */

                const errorMessage =
                    error.message
                        ? error.message.toLowerCase()
                        : "";


                if (

                    errorMessage.includes(
                        "already been submitted"
                    )

                    ||

                    errorMessage.includes(
                        "already submitted"
                    )

                    ||

                    errorMessage.includes(
                        "duplicate"
                    )

                ) {

                    console.log(
                        "Duplicate declaration detected. Checking existing record..."
                    );


                    await checkExistingDeclaration();


                    return;

                }


                /*
                 * ==================================================
                 * SHOW ERROR
                 * ==================================================
                 */

                if (error30) {

                    error30.textContent =
                        error.message ||
                        "Something went wrong while submitting the declaration.";

                    error30.style.display =
                        "block";

                }


                /*
                 * ==================================================
                 * RE-ENABLE SUBMIT
                 * ==================================================
                 */

                if (submitButton) {

                    submitButton.disabled =
                        false;

                    submitButton.textContent =
                        "Submit";

                }

            }

        }

    );

}


/* ============================================================
   LOGOUT
============================================================ */

if (logoutButton) {

    logoutButton.addEventListener(
        "click",
        logout
    );

}


function logout() {

    /*
     * Clear frontend session data.
     */

    sessionStorage.clear();

    localStorage.clear();


    /*
     * Return to PAS portal.
     */

    window.location.href =
        "https://pas.org.in/";

}


/* ============================================================
   INACTIVITY TIMER
============================================================ */

let inactivityTimer;

let warningTimer;


const INACTIVITY_LIMIT =
    15 * 60 * 1000;


const WARNING_TIME =
    60 * 1000;


/* ============================================================
   RESET INACTIVITY TIMER
============================================================ */

function resetInactivityTimer() {

    clearTimeout(
        inactivityTimer
    );


    clearTimeout(
        warningTimer
    );


    /*
     * Hide warning.
     */

    if (customAlert) {

        customAlert.style.display =
            "none";

    }


    /*
     * Warning after 14 minutes.
     */

    warningTimer =
        setTimeout(

            function () {

                if (customAlert) {

                    customAlert.style.display =
                        "flex";

                }

            },

            INACTIVITY_LIMIT -
            WARNING_TIME

        );


    /*
     * Logout after 15 minutes.
     */

    inactivityTimer =
        setTimeout(

            function () {

                logout();

            },

            INACTIVITY_LIMIT

        );

}


/* ============================================================
   STAY LOGGED IN
============================================================ */

function stayLoggedIn() {

    resetInactivityTimer();

}


/* ============================================================
   USER ACTIVITY EVENTS
============================================================ */

[
    "mousemove",
    "mousedown",
    "keypress",
    "scroll",
    "touchstart"
]
.forEach(

    function (eventName) {

        document.addEventListener(

            eventName,

            resetInactivityTimer,

            true

        );

    }

);


/* ============================================================
   START INACTIVITY TIMER
============================================================ */

resetInactivityTimer();