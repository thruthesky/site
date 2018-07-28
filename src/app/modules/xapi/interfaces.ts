export const SERVER_ERROR_CODE = {
    CODE_USER_NOT_FOUND_BY_THAT_EMAIL: -42053
};
export const KEY_LOGIN = 'user-login';

export interface REQUEST {
    route?: string;
    session_id?: string;
}


export interface ID {
    ID: number;
}
export interface ID_O {
    ID?: number;
}
export interface CATEGORY {
    category: string;
}
interface CATEGORY_O {
    category?: string;
}

interface comment_ID {
    comment_ID: number;
}


export interface ERROR_RESPONSE {
    code: number;
    message?: string;
}



export interface FILE {
    id: number;
    type: string;          // can be 'false' if file type is not recognized.
    url: string;
    url_thumbnail?: string;
    url_thumbnail_wide?: string; // only available for the first image. @see google doc
    name: string;
}


export type FILES = Array<FILE>;

export interface FILE_DELETE extends REQUEST {
    id?: number;
    guid?: string;
    post_password?: string;
}




export interface USER_LOGIN {
    route?: string;
    user_email: string;
    user_pass: string;
}


export type USER_DATA = REQUEST;


export interface USER_REGISTER extends REQUEST {
    ID?: number;
    domain?: string;                // @2018-04-10. Add domain for each user.
    user_email?: string;
    user_pass?: string;
    user_login?: string;
    user_type?: '' | 'S' | 'T';
    user_registered?: string;
    name?: string;
    fullname?: string;
    display_name?: string;
    nickname?: string;
    phone_number?: string;
    gender?: string;
    address?: string;
    birthday?: string;
    landline?: string;
    photoURL?: string; // This is used for registration and update only.
    // kakaotalk_id?: string;
    class_software?: string;
    class_software_id?: string;
    kakao_qrmark_URL?: string;
    kakao_qrmark_string?: string;
    primary_photo?: FILE; // This is used on backend response only
    kakao_qrmark_photo?: FILE;
    introduction?: string;
    last_education?: string;
    major?: string;
    civil_status?: string;
    school?: string;
    experience?: string;
    nationality?: string;
    hobby?: string;
    youtube_video_url?: string;
    bookable_time?: number;
    block_free_class_until?: string;
    user_group?: string;
    grade?: string;
    list_order?: string;
    timezone?: string;
    manager?: string;
    point?: string;
    skype?: string;
    kakaotalk?: string;
    wechat?: string;
    line?: string;
    qq?: string;
}

export type USER_UPDATE = USER_REGISTER;
export interface USER_DATA_RESPONSE extends USER_REGISTER {
    age?: string;
}



export interface USER_LOGIN_RESPONSE extends ID {
    user_email: string;
    display_name: string;
    fullname: string;           // name for curriculumn vitae.
    name: string;               // student name.
    nickname: string;           // nickname
    session_id: string;
    photoURL: string;
    photo: FILE;
    provider: string;
    timezone: string;
    domain: string;
    manager: string;            // only available if the user is admin.
}
export type USER_REGISTER_RESPONSE = USER_LOGIN_RESPONSE;
export type USER_UPDATE_RESPONSE = USER_LOGIN_RESPONSE;





export interface USER_CHANGE_PASSWORD extends REQUEST {
    old_password: string;
    new_password: string;
}







export interface POST_CREATE_COMMON {
    post_title: string;
    post_content?: string;
    post_content_pre?: string;              /// pre process 'post_content' by forum.service.ts that is available only on client end.
    post_password?: string;
    post_author_name?: string;             /// This is anonymous user name when a anonymous post without login.
    /// post_author_name, post_author_email, post_author_phone_number will only be available on create.
    post_author_email?: string;

    post_author_phone_number?: string;     /// 'author' field will be available for reading.
    fid?: Array<number>;
    int_1?: number;
    int_2?: number;
    int_3?: number;
    char_1?: string;
    char_2?: string;
    char_3?: string;
    varchar_1?: string;
    varchar_2?: string;
    varchar_3?: string;
    varchar_4?: string;
    varchar_5?: string;
    site_preview_id?: number; /// available only
}


export interface POST_CREATE extends REQUEST, ID_O, CATEGORY, POST_CREATE_COMMON { }
export type POST_CREATE_RESPONSE = number;
export interface POST_UPDATE extends REQUEST, ID, CATEGORY_O, POST_CREATE_COMMON { }



export interface POST_DELETE extends REQUEST, ID {
    post_password?: string;
}

export interface POST_DELETE_RESPONSE {
    ID: number;
    mode: 'delete' | 'mark';
}

export interface POST_DATA extends REQUEST, ID {
    thumbnail?: THUMBNAIL_SIZES;
}

export interface POST_READ_COMMON extends ID, POST_CREATE_COMMON {
    author: AUTHOR;
    readonly category_slug?: string; // category. only available on get_post()
    readonly category_option?: CATEGORY_OPTION; // only available on get_post().
    comment_count: number;
    comments: COMMENTS;
    guid: string;
    files: FILES;
    post_date: string;
    post_parent: number;
    post_password?: string; // password does not come from server.
    meta: any;
    shortDate?: string;             /// made by client
    readonly count_images?: number;      /// number of image files. made by server.
    readonly count_files?: number;  /// number of files that are not image. made by server.
    readonly site_preview: SITE_PREVIEW;
}

export interface POST_DATA_RESPONSE extends ID, POST_READ_COMMON { }

export interface POST extends ID, POST_READ_COMMON { }
export type POSTS = Array<POST>;

type THUMBNAIL_SIZES = '32x32' | '64x64' | '100x100' | '160x100' | '200x200' | '400x400' | '800x320' | '800x800';

export interface POST_LIST extends REQUEST {
    // slug. This is not category name. This is how wordpress does. it uses category_name insteadm of 'slug' to search slug.
    category_name: string;
    posts_per_page?: number; // no of posts in a page.
    paged?: number; // what page.
    thumbnail?: THUMBNAIL_SIZES; // default thumbnail size.
}

export interface POST_LIST_RESPONSE {
    posts: POSTS;
    post_count: number; // no of posts retrived from database. if it is less than POST_LIST.posts_per_page, this may be the last page.
    found_posts: number; // no of total posts found by the search of POST_LIST request. This is the number of posts by the search.
    max_num_pages: number; // no of total pages by the POST_LIST search request.



    //// Below are coming from https://codex.wordpress.org/Class_Reference/WP_Query#Properties $query_vars
    cat: string;                    // catgory no
    category_name: string;          // category name
    comments_per_page: string;      // comments_per_page
    paged: number;                  // paged

    readonly category_option?: CATEGORY_OPTION; // only available on get_post().

}

/**
 * Used by forum.postList(), forum.postSearch()
 *
 * COMMENT differs from COMMENT_DATA_RESPONSE which does not have 'depth' property.
 * 'depth' property comes with the whole list of comments of a post.
 * When you get a comment alone, you cannot have 'depth'.
 */
export interface COMMENT {
    author: AUTHOR;
    comment_ID: number;
    comment_approved: string;
    comment_author: string;
    comment_content: string;
    comment_date: string;
    comment_parent: number;
    comment_post_ID: number;
    comment_type: string;
    depth: number;
    user_id: number;
    files: FILES;
    meta: any;
    site_preview: SITE_PREVIEW;
}

export type COMMENTS = Array<COMMENT>;

export interface COMMENT_CREATE extends REQUEST {
    comment_post_ID: number; // root post ID. to which post the comment will show up.
    comment_author?: string; // fixed value - can be dynamic
    comment_author_email?: string;  // fixed value - can be dynamic
    comment_author_url?: string; // URL of the author or content or any url. fixed value - can be dynamic
    comment_content?: string; // Comment messsage... //fixed value - can be dynamic
    /**
     * parent comment to reply under that comment. 0 if it's not a reply to another comment;
     * if it's a reply, mention the parent comment ID here
     */
    comment_parent?: number;
    fid?: Array<number>;
    site_preview_id?: number;
}

export interface COMMENT_CREATE_RESPONSE {
    post_ID: number;
    comment_ID: number;
    tokens: Array<string>;
}

export interface COMMENT_DATA extends REQUEST, comment_ID {
    thumbnail?: THUMBNAIL_SIZES; // default thumbnail size.
}

/**
 * This is being used by forum.commentData()
 * COMMENT_DATA_RESPONSE is different from COMMENT which has 'depth'.
 */
export type COMMENT_DATA_RESPONSE = COMMENT;

export interface COMMENT_UPDATE extends REQUEST, comment_ID {
    comment_content?: string;
    fid?: Array<number>;
    site_preview_id?: number;
}
export interface COMMENT_UPDATE extends REQUEST, comment_ID {
    comment_content?: string;
    fid?: Array<number>;
    site_preview_id?: number;
}


export interface COMMENT_DELETE extends REQUEST, comment_ID { }

export interface COMMENT_DELETE_RESPONSE extends comment_ID {
    mode: 'delete' | 'mark';
}


export interface AUTHOR {
    ID?: number;
    name?: string;
    email?: string;
    phone_number?: string;
    photoURL?: string;
}

export interface CATEGORY_OPTION {
    file_position: 'top' | 'bottom';
}

export interface SITE_PREVIEW {
    id: number;
    url: string;
    url_image: string;
    title: string;
    content: string;
}

export type PAGE = POST_LIST_RESPONSE;
export type PAGES = PAGE[];



export interface STUDENT_COMMENT_TO_TEACHER {
    comment?: string;
    idx?: number;
    idx_student?: number;
    idx_teacher?: number;
    photoURL?: string;
    rate?: number;
    internet?: number;
    camera?: string;
    stamp?: number;
    student_name?: string;
}

export type STUDENT_COMMENTS_TO_TEACHER = Array<STUDENT_COMMENT_TO_TEACHER>;


export interface SCHEDULE_TABLE_HEADER {
    date: string;
    day: string;
    display_date: string;
    user_time_date: string;
    user_time_day: string;
}


export interface SESSION {
    d: any;
    f: any;
    i: any;
    e: any;
    o: any;
    w: any;
    p: any;
    r: any;
    s: any;
    n: any;
}

export interface SCHEDULE_COMPRESSED {
    t: any;
    b: any;
    u: any;
    p: any;
    a: any;
}


export interface TEACHER {
    idx: string;
    name: string;
    photoURL: string;
    age: number;
    grade: number;
    gender: string;
    skype: string;
    kakaotalk: string;
    wechat: string;
    line: string;
    qq: string;
    kakao_qrmark_string: string;
    youtube_video_url?: string;
    nationality?: string;
    total_reservation?: number;
    introduction?: string;
    user_group?: string;
}

export type TABLE = Array<Array<{ [key: string]: SESSION }>>;

export interface SCHEDULE_TABLE {
    header: Array<SCHEDULE_TABLE_HEADER>;
    no_of_schedules: number;
    schedule: { [idx_schedule: string]: SCHEDULE_COMPRESSED };
    starting_day: string;
    student: { [key: string]: any };
    table: TABLE;
    teacher: TEACHER;
    teachers: {
        [idx: string]: TEACHER
    };
}


export const N = {
    'date': 'd',
    'dayoff': 'f',
    'idx_reservation': 'i',
    'idx_schedule': 'e',
    'open': 'o',              /// 'open' can have one of SESSION_OPEN, SESSION_RESERVED, SESSION_NO_SCHEDULE
    'owner': 'w',
    'point': 'p',
    'prere': 'r',
    'status': 's',            /// 'status'  can have one of SESSION_FUTURE or SESSION_PAST
    'student_name': 'n',

    'idx_teacher': 't',
    'class_begin': 'b',
    'user_time_class_begin': 'u',
    'duration': 'a',

    'session_no_schedule': 'N',
    'session_open': 'O',    /// This 'O' means, the class is open. Not reserved.
    'session_past': 'P',
    'session_future': 'F',
    'session_reserved': 'R'
};


export interface BOOK {
    idx: string;
    date: string;
    class_begin: string;
    class_end: string;
    point: string;
    idx_teacher: string;
    idx_student: string;
    idx_schedule: string;
    stamp_reserve: string;
    stamp_checked: string;
    paid: string;
    refund_request_at: string;
    refund_request_message: string;
    refund_reject_at: string;
    refund_reject_message: string;
    refund_done_point: string;
    refund_done_at: string;
    refund_done_by: string;
    refund_settle_at: string;
    refund_settle_message: string;
    teacher_absent: string;
    student_absent: string;
    successful: string;
    expression: string;
    vocabulary: string;
    grammar: string;
    pronunciation: string;
    speed: string;
    comment: string;
    book_used: string;
    book_next: string;
    student: {
        idx: string;
        email: string;
        phone_number: string;
        name: string;
        display_name: string;
        point: string;
        kakaotalk_id: string;
        class_software: string;
        class_software_id: string;
    };
    teacher: {
        idx: string;
        email: string;
        name: string;
        display_name: string;
        kakaotalk_id: string;
        grade: string;
    };
}





export interface TEACHER_SITE_INFO {
        no_of_teacher: string;
        no_of_student: string;
        no_of_reservations: string;
        no_of_past: string;
        comment_from_student: {
            total: string;
            comments: Array<any>;
            page: string;
            limit: string;
        };
        comment_from_teacher: Array<any>;
        recent_reservations: Array<any>;
        recent_graded_teachers: Array<any>;
        topearner: {
            title: string;
            content: string;
            src: string;
        };
}


export interface Branch {
    idx: number;
    user_ID: string;
    domain: string;
    ceo_name: string;
    manager_name: string;
    company_name: string;
    company_phone: string;
    company_email: string;
    company_address: string;
    company_business_registration_no: string;
    company_business_registration_other_no: string;
    manager_phone: string;
    manager_email: string;
    site_name: string;
    html_title: string;
    html_description: string;
    html_keywords: string;
    html_header: string;
    html_footer: string;
    copyright: string;
    class_software: string;
    no_of_students: string;
    stamp_register: string;
    stamp_update: string;
    domain_change_application: string;
    logo_url: string;
    owner: {
        name: string;
        email: string;
    };
    teachers_group: string;
    teachers_level: string;
    teachers_idx: string;
    teachers_order: string;
    teachers_exclude: string;
}



export interface LMS_INFO {
    usd_exchange_rate: string;
    php_exchange_rate: string;
    PAYPAL_STUDENT_FEE: string;
    MAX_FREE_CLASS: string;
    MAX_FREE_CLASS_WITH_SAME_TEACHER: string;
    MAX_FREE_CLASS_MINUTES: string;
    MAX_FREE_CLASS_LIMIT: string;
    MAX_CANCELLABLE_TIME: string;
    CANCELLABLE_TIME_FOR_INSTANT_RESERVATION: string;
    MAX_REFUNDABLE_TIME: string;
    MAX_POINT_PER_TEACHER_GRADE: string;
    student: string;
    teacher: string;
    reservation: string;                // no of total reservations of all.
    past: string;                       // no of total past of all students.
    leveltest: string;
    branch: Branch;
    VAT: string;
    NEW_EXCHANGE_BUYER_RATE: string; // student
    NEW_EXCHANGE_SELLER_RATE: string; // teacher
}


export interface TEACHER_LIST_INFO {
    ID: string;
    age: string;
    birthday: string;
    bookable_time: string;
    display_name: string;
    user_group: string;
    grade: string;
    kakao_qrmark_string: string;
    kakaotalk_id: string;
    list_order: string;
    photoURL: string;
    total_reservation: string;
    youtube_video_url: string;
    has_schedule: string;
}
export interface TEACHER_LIST_RESPONSE {
    total: string;
    teachers: Array<TEACHER_LIST_INFO>;
}

export interface ADMIN_SUMMARY_REPORT {
    no_of_past?: string;
    no_of_past_session_for_previous_30days?: string;
    no_of_past_session_this_month?: string;
    no_of_past_session_yesterday?: string;
    no_of_payment_previous_30days?: string;
    no_of_payment_this_month?: string;
    no_of_payment_today?: string;
    no_of_payment_yesterday?: string;
    no_of_point_refund_request?: string;
    no_of_registered_30day_ago?: string;
    no_of_registration_this_month?: string;
    no_of_registration_today?: string;
    no_of_registration_yesterday?: string;
    no_of_reservation?: string;
    no_of_reservation_for_next_30days?: string;
    no_of_reservation_this_month?: string;
    no_of_reservation_today?: string;
    no_of_reservation_tomorrow?: string;
    no_of_student?: string;
    no_of_student_didnt_reserve?: string;
    no_of_student_who_paid?: string;
    no_of_student_with_freeclass?: string;
    no_of_student_with_paid_class?: string;
}

export interface PAGINATION_OPTION {
    limitPerPage: number;
    currentPage: number;
    limitPerNavigation: number;
    totalRecord: number;
}

export interface STUDENT {
    ID: number;
    class_software: string;
    display_name: string;
    greeting: string;
    photoURL: string;
    user_registered: string;
}

export type STUDENTS = Array<STUDENT>;

export interface STUDENT_LIST_OPTION extends PAGINATION_OPTION {
    students: STUDENTS;
}

export interface GREETING {
    ID: number;
    class_software: string;
    display_name: string;
    greeting: string;
    photoURL: string;
    greeting_update_stamp: string;
    level: number;
}

export type GREETINGS = Array<GREETING>;

export interface GREETING_LIST_OPTION extends PAGINATION_OPTION {
    greetings: GREETINGS;
}
